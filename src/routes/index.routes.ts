import { Router } from 'express'
import { GameController } from '../controllers/gameController'
import { AuthController } from '../controllers/authController'

export const routes = Router()

routes.get('/', GameController.get)

routes.get('/games', GameController.getAll)

routes.get('/game/:id', GameController.getOne)

routes.post('/game', GameController.create)

routes.put('/game/:id', GameController.edit)

routes.delete('/game/:id', GameController.delete)

routes.post('/user/auth', AuthController.auth)
routes.post('/user/create', AuthController.createUser)
