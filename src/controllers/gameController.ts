import { Request, Response } from 'express'
import { z } from 'zod'
import { gameRepository } from '../repositories/gameRepository'

export class GameController {
  static get(req: Request, res: Response) {
    res.redirect('/games')
  }

  static async getAll(req: Request, res: Response) {
    const games = await gameRepository.find()
    res.statusCode = 200
    return res.json(games)
  }

  static async getOne(req: Request, res: Response) {
    const id = +req.params.id
    if (isNaN(id)) {
      res.statusCode = 400
      return res.json({ Error: 'Bad Request' })
    } else {
      try {
        const game = await gameRepository.findOneBy({ id })
        if (game == null) {
          res.statusCode = 404
          return res.json({ Error: 'Game not found' })
        } else {
          res.statusCode = 200
          return res.json(game)
        }
      } catch (error) {
        res.statusCode = 404
        return res.json({ Error: 'Game not found' })
      }
    }
  }

  static async create(req: Request, res: Response) {
    const createGameSchema = z.object({
      cover: z.string().nonempty(),
      title: z.string().nonempty(),
      developer: z.string().nonempty(),
      year: z.number().min(1987).nonnegative(),
      price: z.number().nonnegative(),
    })

    try {
      const { cover, title, developer, year, price } = createGameSchema.parse(
        req.body
      )
      const newGame = gameRepository.create({
        cover,
        title,
        developer,
        year,
        price,
      })
      await gameRepository.save(newGame)
      res.statusCode = 201
      return res.json({ success: 'Game has been added successfully' })
    } catch (error) {
      res.statusCode = 400
      return res.json({ Error: 'Bad request' })
    }
  }

  static async edit(req: Request, res: Response) {
    const createGameSchema = z.object({
      cover: z.string().nonempty().optional(),
      title: z.string().nonempty().optional(),
      developer: z.string().nonempty().optional(),
      year: z.number().min(1987).nonnegative().optional(),
      price: z.number().nonnegative().optional(),
    })
    const id = +req.params.id
    if (isNaN(id)) {
      res.statusCode = 400
      return res.json({ Error: 'Bad request' })
    } else {
      const game = await gameRepository.findOneBy({ id })

      if (game === null) {
        res.statusCode = 404
        return res.json({ Error: 'Game not found' })
      } else {
        try {
          const { cover, title, developer, year, price } =
            createGameSchema.parse(req.body)

          if (cover !== undefined) {
            gameRepository.update({ id }, { cover })
          }

          if (title !== undefined) {
            gameRepository.update({ id }, { title })
          }
          if (developer !== undefined) {
            gameRepository.update({ id }, { developer })
          }
          if (year !== undefined) {
            gameRepository.update({ id }, { year })
          }
          if (price !== undefined) {
            gameRepository.update({ id }, { price })
          }
          res.statusCode = 200
          return res.json({ success: 'Game has been edited successfully' })
        } catch (error) {
          res.statusCode = 400
          return res.json({ Error: 'Bad Request' })
        }
      }
    }
  }

  static async delete(req: Request, res: Response) {
    const id = +req.params.id
    if (isNaN(id)) {
      res.statusCode = 400
      return res.json({ Error: 'Bad Request' })
    } else {
      const game = await gameRepository.findOneBy({ id })
      if (game === null) {
        res.statusCode = 404
        return res.json({ Error: 'Game not found' })
      } else {
        gameRepository.delete({ id })
        res.statusCode = 200
        return res.json({ success: 'Game has been removed successfully' })
      }
    }
  }
}
