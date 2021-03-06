import jwt from 'jsonwebtoken'
import { UserInstance } from '../models/interfaces'
import { Token } from '../models/models'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') })

interface IUser extends Omit<UserInstance, 'password'> {}

class TokenService {
  generateTokens(payload: {
    id: number
    login: string
    email: string
    role: string
    pseudonym: string
    isActivated: boolean
    activationLink: string
  }) {
    const accessToken = jwt.sign(payload, `${process.env.JWT_ACCESS_SECRET}`, {expiresIn:'30m'})
    const refreshToken = jwt.sign(payload, `${process.env.JWT_REFRESH_SECRET}`, {expiresIn:'30d'})
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await Token.findOne({ where: { userId: userId } })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token = await Token.create({refreshToken, userId})
    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.destroy({where: {refreshToken}})
    return tokenData
  }

  validateAccessToken(token: string) {
    try {
      const userData = <jwt.IUserJWT>jwt.verify(token, `${process.env.JWT_ACCESS_SECRET}`)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = <jwt.IUserJWT>jwt.verify(token, `${process.env.JWT_REFRESH_SECRET}`)
      return userData
    } catch (e) {
      return null
    }
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({where: {refreshToken}})
    return tokenData
  }

}

export default new TokenService()
