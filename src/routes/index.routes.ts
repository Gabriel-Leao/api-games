import { Router } from 'express'
import { GameController } from '../controllers/gameController'

export const routes = Router()

routes.get('/games', GameController.getAll)

routes.get('/game/:id', GameController.getOne)

routes.post('/game', GameController.create)

routes.put('/game/:id', GameController.edit)

routes.delete('/game/:id', GameController.delete)
