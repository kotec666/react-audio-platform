
import { NextFunction, Request, Response } from 'express'
import ApiError from '../error/ApiError'
import tokenService from '../service/tokenService'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') })


class authMiddleware {
  auth (req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      let token = ''

      if (req.headers.authorization && req.headers.authorization.split(' ')[1]) {
        token = req.headers.authorization.split(' ')[1]  // Bearer jsakldjklasjlk
      } else {
        return next(ApiError.unauthorizedError())
      }

      const userData = tokenService.validateAccessToken(token)
      if (!userData) {
        return next(ApiError.unauthorizedError())
      }

      req.user = userData
      next()
    } catch (e) {
      return next(ApiError.unauthorizedError())
    }
  }
}


export default new authMiddleware()
