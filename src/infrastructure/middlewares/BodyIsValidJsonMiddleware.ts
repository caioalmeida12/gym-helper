import { Context, Next } from "hono";
import { ApplicationProblemJsonError } from "../libs/ApplicationProblemJson";

export const BodyIsValidJsonMiddleware = async (c: Context, next: Next) => {
    if (!(['POST', 'PUT'].includes(c.req.method))) return await next()

    try {
        // Ensure that the request body is valid a JSON
        await c.req.json();

        await next();
    } catch (error) {
        if (!(error instanceof SyntaxError && error.message.includes("Unexpected end of JSON input"))) throw error;

        throw new ApplicationProblemJsonError({
            detail: "O corpo da requisição não é um JSON válido.",
            status: 400,
            body: c.req.raw
        });
    }
}
