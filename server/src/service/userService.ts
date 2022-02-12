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
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
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

  async login (login: string, password: string) {
    const user = await User.findOne({ where: { login: login } })
    if (!user) {
      throw ApiError.badRequest(`Пользователя с логином ${login} не существует`)
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password)
    if (!isPasswordEquals) {
      throw ApiError.badRequest(`Неверный пароль`)
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
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
    // @ts-ignore
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}
  }

  async getAllUsers() {
    const users = User.findAll()
    return users
  }
}

export default new UserService()
