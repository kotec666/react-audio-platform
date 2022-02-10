// import jwt, { JwtPayload } from 'jsonwebtoken'
// import { NextFunction, Response, Request } from 'express'
// import { UserInstance } from '../models/interfaces'
//
// class checkRoleMiddleware {
//   checkRole (role: string) {
//     return function(req: Request, res: Response, next: NextFunction) {
//       if (req.method === 'OPTIONS') {
//         next()
//       }
//       try {
//
//
//         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//           const token = req.headers.authorization.split(' ')[1]  // Bearer jsakldjklasjlk
//           if (!token) {
//             return res.status(401).json({ message: 'Не авторизован' })
//           }
//
//
//           const decoded = jwt.verify(token, 'SSSSSSSSSSSSSSSSECRET_KEY')
//
//           if (decoded.role !== role) {
//             return res.status(403).json({ message: 'Нет доступа' })
//           }
//
//           req.user = decoded
//           next()
//         }
//
//       } catch (e) {
//         res.status(401).json({ message: 'Не авторизован' })
//       }
//     }
//   }
// }
//
//
