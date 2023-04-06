import { Request, Response, NextFunction } from 'express'
import Jwt from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers['authorization']

  if (bearerToken !== undefined) {
    const token = bearerToken.split(' ')[1]
    const jwtSecret = process.env.TK_SEC as string
    Jwt.verify(token, jwtSecret, (error, data) => {
      if (error) {
        res.statusCode = 401
        res.json({ Error: 'Invalid token' })
      } else {
        next()
      }
    })
  } else {
    res.statusCode = 401
    res.json({ Error: 'Invalid token' })
  }
}
