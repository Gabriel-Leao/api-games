import { STRING } from 'sequelize'
import { database } from '../config/db.config'

export const User = database.define('users', {
  name: {
    type: STRING,
    allowNull: false,
  },

  email: {
    type: STRING,
    allowNull: false,
  },

  password: {
    type: STRING,
    allowNull: false,
  },
})
