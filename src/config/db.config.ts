import { Sequelize } from 'sequelize'
import 'dotenv/config'

const port = process.env.DB_PORT as number | undefined
const host = process.env.DB_HOST as string
const username = process.env.DB_USER as string
const password = process.env.DB_PASS as string
const db = process.env.DB_NAME as string

export const database = new Sequelize(db, username, password, {
  host,
  dialect: 'mysql',
  port,
  timezone: '-03:00',
  define: {
    timestamps: false,
  },
})
