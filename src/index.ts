import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { GetExerciciosHonoController } from './presentation/GetExerciciosHonoController'
import { SequelizeRepository } from './infrastructure/repositories/SequelizeRepository'
import { IExercicioCommand, IExercicioQuery } from './domain/entities/IExercicio'
import { ExercicioModel } from './infrastructure/database/models/ExercicioModel'
import { logger } from 'hono/logger'
import { DatabaseSingletonFactory } from './infrastructure/database/DatabaseFactory'
import { ESupportedDatabaseDrivers } from './domain/database/IDatabaseSingletonFactory'
import { EmptyDataFieldMiddleware } from './infrastructure/middlewares/EmptyDataFieldMiddleware'
import { ApplicationProblemJsonMiddleware } from './infrastructure/middlewares/ApplicationProblemJsonMiddleware'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()

app.use(prettyJSON())
app.use(logger());
app.use(ApplicationProblemJsonMiddleware)
app.use(EmptyDataFieldMiddleware)

await new DatabaseSingletonFactory().createDatabase(ESupportedDatabaseDrivers.SQLITE).then((db) => db.connect())

const exerciciosRepository = new SequelizeRepository<IExercicioCommand, IExercicioQuery>(ExercicioModel)

app.get("/exercicios", async (c, next) => {
  return await GetExerciciosHonoController.findAll(exerciciosRepository, c, next)
})

app.get("/exercicios/:id",
async (c, next) => {
  return await GetExerciciosHonoController.findById(exerciciosRepository, c, next)
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})


