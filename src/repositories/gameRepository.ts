import { dataSource } from '../data-source'
import { Game } from '../models/Game'

export const gameRepository = dataSource.getRepository(Game)
