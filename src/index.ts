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
import { envLogger } from './infrastructure/libs/EnvFile'
import { ApplicationProblemJsonMiddleware } from './infrastructure/middlewares/ApplicationProblemJsonMiddleware'
import { ContentTypeApplicationJsonEnforceMiddleware } from './infrastructure/middlewares/ContentTypeApplicationJsonEnforceMiddleware'
import { PostExerciciosHonoController } from './presentation/PostExerciciosHonoController'
import { AppendContentTypeApplicationProblemJsonMiddleware } from './infrastructure/middlewares/AppendContentTypeApplicationProblemJsonMiddleware'
import { ZodErrorMiddleware } from './infrastructure/middlewares/ZodErrorMiddleware'
import { SequelizeErrorMiddleware } from './infrastructure/middlewares/SequelizeErrorMiddleware'
import { BodyIsValidJsonMiddleware } from './infrastructure/middlewares/BodyIsValidJsonMiddleware'

const app = new Hono()

envLogger('.env')

app.use(logger());


// Response middlewares
app.use(AppendContentTypeApplicationProblemJsonMiddleware)
app.use(ApplicationProblemJsonMiddleware)
app.use(ZodErrorMiddleware)
app.use(SequelizeErrorMiddleware)
app.use(EmptyDataFieldMiddleware)

// Request middlewares
app.use(ContentTypeApplicationJsonEnforceMiddleware)
app.use(BodyIsValidJsonMiddleware)

await new DatabaseSingletonFactory().createDatabase(ESupportedDatabaseDrivers.SQLITE).then((db) => db.connect())

const exerciciosRepository = new SequelizeRepository<IExercicioCommand, IExercicioQuery>(ExercicioModel)

app.get(`${process.env.ROUTE_EXERCICIOS}`, async (c, next) => await GetExerciciosHonoController.findAll(exerciciosRepository, c, next))
app.get(`${process.env.ROUTE_EXERCICIOS}/:id`, async (c, next) => await GetExerciciosHonoController.findById(exerciciosRepository, c, next))
app.post(`${process.env.ROUTE_EXERCICIOS}`, async (c, next) => await PostExerciciosHonoController.create(exerciciosRepository, c, next))

app.get("/health", async (c) => {
  return c.json({ status: "ok" })
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})


