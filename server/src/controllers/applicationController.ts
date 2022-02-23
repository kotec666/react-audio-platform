import { NextFunction, Request, Response } from 'express'
import applicationService from '../service/applicationService'

class ApplicationController {

  async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, pseudonym } = req.body
      const application = await applicationService.addApplication(+userId, pseudonym)
      return res.json(application)
    } catch (e) {
      next(e)
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const application = await applicationService.deleteApplication(+userId)
      return res.json(application)
    } catch (e) {
      next(e)
    }
  }

  async acceptOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, pseudonym } = req.body
      const application = await applicationService.acceptApplication(+userId, pseudonym)
      return res.json(application)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const applications = await applicationService.getAllApplications()
      return res.json(applications)
    } catch (e) {
      next(e)
    }
  }

}

export default new ApplicationController()
