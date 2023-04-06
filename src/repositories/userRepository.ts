import { dataSource } from '../data-source'
import { User } from '../models/User'

export const userRepository = dataSource.getRepository(User)
