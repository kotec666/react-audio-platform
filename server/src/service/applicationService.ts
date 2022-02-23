import { Application, User } from '../models/models'
import ApiError from '../error/ApiError'

class ApplicationService {

  async addApplication(userId: number, pseudonym: string) {
    const candidate = await Application.findOne({ where: { userId: userId } })
    if (candidate) {
      throw ApiError.badRequest(`Заявка от пользователя с id: ${userId} уже существует, заявка должна быть уникальной`)
    }
    const user = await User.findOne({ where: { id: userId } })
    let isSinger
    if (user) {
      isSinger = user.role === 'SINGER'
      console.log(isSinger)
      if (!isSinger) {
        const uniquePseudonym = await Application.findOne({ where: { pseudonym: pseudonym } })
        if (uniquePseudonym) {
          throw ApiError.badRequest(`Заявка с псевдонимом: ${pseudonym} уже существует, псевдоним должeн быть уникален`)
        }
        const uniqueUserPseudonym = await User.findOne({ where: { pseudonym: pseudonym } })
        if (uniqueUserPseudonym) {
          throw ApiError.badRequest(`Пользователь с псевдонимом: ${pseudonym} уже существует, псевдоним должeн быть уникален`)
        }
        const application = await Application.create({ userId: userId, pseudonym: `${pseudonym}` })
        return { application: application }
      } else  {
        throw ApiError.badRequest(`У вас уже есть статус SINGER`)
      }
    } else {
      throw ApiError.badRequest(`ошибка, нет пользователя`)
    }

  }

  async deleteApplication(userId: number) {
    const applications = await Application.findOne({ where: { userId: userId } })
    if (!applications) {
      throw ApiError.badRequest(`Заявка от пользователя с id: ${userId} не существует`)
    }
    await applications.destroy()
    return { status: 204 }
  }

  async acceptApplication(userId: number, pseudonym: string) {
    const applications = await Application.findOne({ where: { userId: userId } })
    if (!applications) {
      throw ApiError.badRequest(`Заявка от пользователя с id: ${userId} не существует`)
    }
    const user = await User.findOne({ where: { id: userId } })
    if (!user) {
      throw ApiError.badRequest(`Пользователя с id: ${userId} не существует`)
    }
    user.role = 'SINGER'
    user.pseudonym = `${pseudonym}`
    await user.save()
    await this.deleteApplication(userId)
    return { status: 200 }
  }


  async getAllApplications() {
    const applications = await Application.findAll()
    return { applications: applications }
  }
}

export default new ApplicationService()
