import { dataSource } from '../data-source'
import { User } from '../model/User'

export const userRepository = dataSource.getRepository(User)
