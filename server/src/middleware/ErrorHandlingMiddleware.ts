import { NextFunction, Request, Response } from 'express'
import ApiError from './../error/ApiError'


interface IErr {
  status: number
  message: string
}

class errorHandlingMiddleware {
  errorHandling (err: IErr, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
      return res.status(err.status).json({message: err.message})
    }
    // @ts-ignore
    return res.status(err).json({message: err.message})
  }
}


export default new errorHandlingMiddleware()
