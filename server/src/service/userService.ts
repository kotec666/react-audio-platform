import { Favorite, Recently, User } from '../models/models'
import bcrypt from 'bcrypt'
import mailService from './mailService'
import tokenService from './tokenService'
import UserDto from '../dtos/userDto'
import * as uuid from 'uuid'
import ApiError from '../error/ApiError'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

class UserService {

  async registration(login: string, password: string, email: string) {
    const candidate = await User.findOne({ where: { email: email } })
    if (candidate) {
      throw ApiError.badRequest(`Пользователь с адресом ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    const user = await User.create({login: login, password: hashPassword, email: email, role: 'USER', pseudonym: '', isActivated: false, activationLink: activationLink})
  // ! ! ! ! await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    const favorite = await Favorite.create({userId: userDto.id})
    const recently = await Recently.create({userId: userDto.id})

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
}

export default new UserService()
