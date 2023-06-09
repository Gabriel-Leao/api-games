import { Request, Response } from 'express'
import { z } from 'zod'
import { Games } from '../models/Game'

export class GameController {
  static get(req: Request, res: Response) {
    res.redirect('/games')
  }

  static async getAll(req: Request, res: Response) {
    const games = await Games.findAll()
    const newGames = games.map((game: any) => {
      const _links = [
        {
          href: `${req.protocol}://${req.get('host')}/game/${game.id}`,
          method: 'GET',
          rel: 'get_game',
        },
        {
          href: `${req.protocol}://${req.get('host')}/game/${game.id}`,
          method: 'PUT',
          rel: 'edit_game',
        },
        {
          href: `${req.protocol}://${req.get('host')}/game/${game.id}`,
          method: 'DELETE',
          rel: 'delete_game',
        },
      ]
      return { game, _links }
    })
    res.statusCode = 200
    return res.json(newGames)
  }

  static async getOne(req: Request, res: Response) {
    const id = +req.params.id
    if (isNaN(id)) {
      res.statusCode = 400
      return res.json({ Error: 'Bad Request' })
    } else {
      try {
        const game = await Games.findByPk(id)
        if (game == null) {
          res.statusCode = 404
          return res.json({ Error: 'Game not found' })
        } else {
          const _links = [
            {
              href: `${req.protocol}://${req.get('host')}/games/`,
              method: 'GET',
              rel: 'get_all_games',
            },
            {
              href: `${req.protocol}://${req.get('host')}/game/${id}`,
              method: 'PUT',
              rel: 'edit_game',
            },
            {
              href: `${req.protocol}://${req.get('host')}/game/${id}`,
              method: 'DELETE',
              rel: 'delete_game',
            },
          ]
          res.statusCode = 200
          return res.json({ game, _links })
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
      await Games.create({
        cover,
        title,
        developer,
        year,
        price,
      })
      res.statusCode = 201
      return res.json({ Success: 'Game has been added successfully' })
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
      const game = await Games.findByPk(id)

      if (game === null) {
        res.statusCode = 404
        return res.json({ Error: 'Game not found' })
      } else {
        try {
          const { cover, title, developer, year, price } =
            createGameSchema.parse(req.body)

          if (cover !== undefined) {
            Games.update({ cover }, { where: { id } })
          }

          if (title !== undefined) {
            Games.update({ title }, { where: { id } })
          }
          if (developer !== undefined) {
            Games.update({ developer }, { where: { id } })
          }
          if (year !== undefined) {
            Games.update({ year }, { where: { id } })
          }
          if (price !== undefined) {
            Games.update({ price }, { where: { id } })
          }
          res.statusCode = 200
          return res.json({ Success: 'Game has been edited successfully' })
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
      const game = await Games.findByPk(id)
      if (game === null) {
        res.statusCode = 404
        return res.json({ Error: 'Game not found' })
      } else {
        Games.destroy({ where: { id } })
        res.statusCode = 200
        return res.json({ Success: 'Game has been removed successfully' })
      }
    }
  }
}
