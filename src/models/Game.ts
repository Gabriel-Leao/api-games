import { STRING, INTEGER, FLOAT } from 'sequelize'
import { database } from '../config/db.config'

export const Games = database.define('games', {
  cover: {
    type: STRING,
    allowNull: false,
  },

  title: {
    type: STRING,
    allowNull: false,
  },

  developer: {
    type: STRING,
    allowNull: false,
  },

  year: {
    type: INTEGER,
    allowNull: false,
  },

  price: {
    type: FLOAT,
    allowNull: false,
  },
})
