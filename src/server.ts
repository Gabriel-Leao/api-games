import bodyParser from 'body-parser'
import express from 'express'
import { routes } from './routes/index.routes'
import cors from 'cors'
import { database } from './config/db.config'

database
  .authenticate()
  .then(() => {
    const port = process.env.PORT || 3333
    const app = express()
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(routes)

    app.listen(port, () => console.log('App running'))
  })
  .catch((err: Error) => {
    console.log(err.message)
  })
