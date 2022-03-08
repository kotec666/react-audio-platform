import { Album, Favorite, Recently, Track, User } from '../models/models'
import bcrypt from 'bcrypt'
import mailService from './mailService'
import tokenService from './tokenService'
import UserDto from '../dtos/userDto'
import * as uuid from 'uuid'
import ApiError from '../error/ApiError'
import { Op } from 'sequelize'

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') })

class UserService {

  async registration(login: string, password: string, email: string) {
    const candidate = await User.findOne({ where: { email: email, login: login } })
    if (candidate) {
      throw ApiError.badRequest(`Пользователь с адресом ${email} уже существует, логин должен быть уникален`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    if (email === 'null') {
      email = uuid.v4()
    }
    const user = await User.create({
      login: login,
      password: hashPassword,
      email: email,
      role: 'USER',
      pseudonym: '',
      isActivated: false,
      activationLink: activationLink
    })
    if (email !== 'null') {
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    const favorite = await Favorite.create({ userId: userDto.id })
    const recently = await Recently.create({ userId: userDto.id })

    return { ...tokens, user: userDto }

  }

  async activate(activationLink: string) {
    const user = await User.findOne({ where: { activationLink: activationLink } })
    if (!user) {
      throw ApiError.badRequest('Неккоректная ссылка активации')
    }
    user.isActivated = true
    await user.save()
  }

  async login(login: string, password: string) {
    const user = await User.findOne({ where: { login: login } })
    if (!user) {
      throw ApiError.badRequest(`Пользователя с логином ${login} не существует`)
    }
    let isPasswordEquals
    if (user.password) {
      isPasswordEquals = await bcrypt.compare(password, user.password)
    }
    if (!isPasswordEquals) {
      throw ApiError.badRequest(`Неверный пароль`)
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError()
    }
    const user = await User.findOne({ where: { id: userData.id } })
    if (!user) {
      return { user: UserDto, accessToken: '', refreshToken: ''}
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async getAllUsers() {
    try {
      const users = await User.findAll({attributes: ['id', 'login', 'role', 'pseudonym']})
      return {user: users}
    } catch (e) {
      console.log(e)
    }
  }

  async getAllPerPageAndSearchWord(_limit: number, page: number, search: string) {
    try {
      let offset = page * _limit - _limit
      const singer = await User.findAndCountAll({
        attributes: ['id', 'pseudonym'],
        where: {
          pseudonym: {
            [Op.like]: `%${search}%`
          }, role: 'SINGER'
        }, offset: +offset, limit: +_limit
      })

      return { singer: singer }
    } catch (e) {
      console.log(e)
    }
  }


  async getAllPerPage(_limit: number, page: number) {
    try {
      let offset = page * _limit - _limit
      const singer = await User.findAndCountAll({
        attributes: ['id', 'pseudonym'],
        where: {
          role: 'SINGER'
        }, offset: +offset, limit: +_limit
      })
      return { singer: singer }
    } catch (e) {
      console.log(e)
    }
  }

  async getSingerDataById(userId: number) {
    try {
      const singer = await User.findAll({
        where: { id: userId, role: 'SINGER'},
        attributes: ['id', 'login', 'email', 'role', 'pseudonym'],
        include: [
          { model: Track, as: 'userTracks' },
          { model: Album, as: 'userAlbums' }
        ]
      })
      return {singer: singer}
    } catch
      (e) {
      console.log(e)
    }
  }

  async getUserDataById(userId: number) {
    try {
      const user = await User.findOne({
        where: { id: userId },
        attributes: ['id', 'login', 'email', 'role', 'pseudonym'],
      })
      return user
    } catch
      (e) {
      console.log(e)
    }
  }

}

export default new UserService()
