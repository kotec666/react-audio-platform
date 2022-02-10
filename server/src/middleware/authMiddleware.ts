import jwt, {JwtPayload} from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { UserInstance } from '../models/interfaces'

require('dotenv').config({ path: __dirname+'/.env' })

export interface IGetUserAuthInfoRequest extends Request {
  user: UserInstance | string | JwtPayload
}

class authMiddleware {
  auth (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      let token = ''

      if (req.headers.authorization && req.headers.authorization.split(' ')[1]) {
        token = req.headers.authorization.split(' ')[1]  // Bearer jsakldjklasjlk
      } else {
        return res.status(401).json({ message: 'Не авторизован' })
      }

      const decoded = jwt.verify(token, 'processSECRET_KEY=secret_jwt_key132123')
      req.user = decoded
      next()
    } catch (e) {
      res.status(401).json({ message: 'Не авторизован' })
    }
  }
}


export default new authMiddleware()
