import { Context, Next } from "hono"
import { ApplicationProblemJsonError } from "../libs/ApplicationProblemJson"

export const ContentTypeApplicationJsonEnforceMiddleware = async (c: Context, next: Next) => {
    if (!(['POST', 'PUT'].includes(c.req.method))) return await next()

    if (c.req.header("content-type") !== 'application/json') {
        throw new ApplicationProblemJsonError({
            status: 415,
            detail: "O cabeçalho Content-Type deve ser application/json"
        })
    }
    await next()
}