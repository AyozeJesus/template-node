import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import expressFileUpload from 'express-fileupload'
import { userRoutes } from './Routes/users.js'
import chalk from 'chalk'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(expressFileUpload())
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads', express.static('src/infrastructure/API/uploads'))
app.use(express.urlencoded({ extended: true }))

// RUTAS
app.use('/', userRoutes)

// Middleware para el error 404
app.use((req, res) => {
  res.status(404).send({
    status: 'Error',
    message: 'Page not found.',
  })
})

// Middleware de gestión de errores personalizados
app.use((error, req, res, next) => {
  console.error(error)

  res.status(error.httpStatus || 500).send({
    status: 'Error',
    message: error.message,
  })
})

// Start server
app.listen(port, () => {
  console.log(chalk.blue(`Server listening on port ${port}`))
})
