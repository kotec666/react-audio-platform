import { NextFunction, Request, Response } from 'express'
import {User} from '../models/models'
import userService from '../service/userService'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

class UserController {

    async registration(req:Request, res:Response, next:NextFunction) {

      try {
        const {login, password, email} = req.body
        const userData = await userService.registration(login, password, email)
        res.cookie(
          'refreshToken',
                userData.refreshToken,
          {
                  maxAge: 30 * 24 * 60 * 60 * 1000,
                  httpOnly: true,
              //  secure: true (for https connection)
                 })
        return res.json(userData)
      } catch (e) {
        next(e)
      }

    }

    async login(req:Request, res:Response, next:NextFunction) {

      try {
        const {login, password} = req.body
        const userData = await userService.login(login, password)
        res.cookie('refreshToken', userData.refreshToken,{maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true,}) //  secure: true (for https connection)})
        return res.json(userData)
      } catch (e) {
        next(e)
      }

    }

    async refresh(req:Request, res:Response, next:NextFunction) {

      try {
        const {refreshToken} = req.cookies
        const userData = await userService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken,
          { maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            //  secure: true (for https connection)
           })
        return res.json(userData)
      } catch (e) {
        next(e)
      }

    }

    async logout(req:Request, res:Response, next:NextFunction) {

      try {
        const { refreshToken } = req.cookies
        const token = await userService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json(token)
      } catch (e) {
        next(e)
      }

    }

    async activate(req:Request, res:Response, next:NextFunction) {
      try {
        const activationLink = req.params.link
        await userService.activate(activationLink)
        res.redirect(`${process.env.CLIENT_URL}`)
      } catch (e) {
        next(e)
      }

    }


  async getUsers(req:Request, res:Response, next:NextFunction) {

    try {
      const users = await userService.getAllUsers()
      return res.json(users)
    } catch (e) {
      next(e)
    }

  }



}

export default new UserController()
