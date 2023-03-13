import { dataSource } from '../data-source'
import { Game } from '../model/Game'

export const gameRepository = dataSource.getRepository(Game)
