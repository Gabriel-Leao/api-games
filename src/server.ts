import bodyParser from 'body-parser'
import express from 'express'
import { dataSource } from './data-source'
import { routes } from './routes/index.routes'
import cors from 'cors'

dataSource
  .initialize()
  .then(() => {
    const port = process.env.PORT || 3333
    const app = express()
    app.use(cors({ origin: '*' }))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(routes)

    app.listen(port, () => console.log('App running'))
  })
  .catch((err: Error) => {
    console.log(err.message)
  })
