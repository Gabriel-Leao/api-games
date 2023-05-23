import { Router } from 'express'
import { GameController } from '../controllers/gameController'
import { AuthController } from '../controllers/authController'
import { auth } from '../middlewares/auth'

export const routes = Router()

routes.get('/', GameController.get)

routes.get('/games', GameController.getAll)

routes.get('/game/:id', GameController.getOne)

routes.post('/game', auth, GameController.create)

routes.put('/game/:id', auth, GameController.edit)

routes.delete('/game/:id', auth, GameController.delete)

routes.post('/user/auth', AuthController.auth)

routes.post('/user/create', auth, AuthController.createUser)
