import jwt from 'jsonwebtoken'
import { NextFunction, Response, Request } from 'express'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

declare module 'jsonwebtoken' {
  export interface IUserJWT extends jwt.JwtPayload {
    id: number
    login: string
    email: string
    role: string
    pseudonym: string
    isActivated: boolean
    activationLink: string
  }
}

export interface IAuthUserRequest extends Request {
  user: jwt.IUserJWT
}

class checkRoleMiddleware {

  checkRole (role: string) {
    return function(req: Request, res: Response, next: NextFunction) {
      if (req.method === 'OPTIONS') {
        next()
      }
      try {


        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          const token = req.headers.authorization.split(' ')[1]  // Bearer jsakldjklasjlk
          if (!token) {
            return res.status(401).json({ message: 'Не авторизован' })
          }

          const decoded = <jwt.IUserJWT>jwt.verify(token, `${process.env.JWT_ACCESS_SECRET}`)

          if (decoded.role !== role) {
            return res.status(403).json({ message: 'Нет доступа' })
          }


          req.user = decoded
          next()
        }

      } catch (e) {
        res.status(401).json({ message: 'Не авторизован' })
      }
    }
  }
}

export default new checkRoleMiddleware()
