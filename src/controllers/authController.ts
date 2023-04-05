import { z } from 'zod'
import { userRepository } from '../repository/userRepository'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../model/User'

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

      const newUser = userRepository.create({ name, email, password: hash })
      await userRepository.save(newUser)
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

      const user: any = await userRepository.findOneBy({ email })

      if (user == null) {
        res.statusCode = 404
        res.json({ Error: 'Email Not Found' })
      } else {
        const correctPassword = bcrypt.compareSync(password, user.password)
        if (correctPassword) {
          res.statusCode = 200
          res.json({ Success: `Hello ${user.name}` })
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
