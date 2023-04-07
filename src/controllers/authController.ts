import { Request, Response } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import { User } from '../models/User'

export class AuthController {
  static async createUser(req: Request, res: Response) {
    const createUserSchema = z.object({
      name: z.string().nonempty().min(3),
      email: z.string().nonempty().email(),
      password: z.string().nonempty().min(8),
    })

    try {
      const { name, email, password } = createUserSchema.parse(req.body)

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      await User.create({ name, email, password: hash })
      res.statusCode = 201
      return res.json({ success: 'User has been added successfully' })
    } catch (error) {
      res.statusCode = 400
      return res.json({ Error: 'Bad request' })
    }
  }

  static async auth(req: Request, res: Response) {
    const userSchema = z.object({
      email: z.string().nonempty().email(),
      password: z
        .string()
        .nonempty()
        .min(8, 'Password should have 8 or more characters'),
    })

    try {
      const { email, password } = userSchema.parse(req.body)

      const user: any = await User.findOne({ where: { email } })

      if (user == null) {
        res.statusCode = 404
        res.json({ Error: 'Email Not Found' })
      } else {
        const correctPassword = bcrypt.compareSync(password, user.password)
        if (correctPassword) {
          const jwtSecret = process.env.TK_SEC as string
          Jwt.sign(
            {
              name: user.name,
              email: user.email,
            },
            jwtSecret,
            { expiresIn: '48h' },
            (err, token) => {
              if (err) {
                res.statusCode = 500
                res.json({ Error: 'Internal server error' })
              } else {
                res.statusCode = 200
                res.json({ Token: token })
              }
            }
          )
        } else {
          res.statusCode = 401
          res.json({ Error: 'Incorrect credentials' })
        }
      }
    } catch (error) {
      res.statusCode = 404
      return res.json({ Error: 'Bad Request' })
    }
  }
}
