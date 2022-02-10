// import { NextFunction, Request, Response } from 'express'
//
// const {Toy} = require('./../models/models')
//
// class TypeController {
//
//     async getAll(req:Request, res:Response, next:NextFunction) {
//         try {
//             const types = await Toy.findAndCountAll()
//             return res.json(types)
//          } catch (e) {
//             console.log(e)
//         }
//     }
//
// }
//
// export default new TypeController()
