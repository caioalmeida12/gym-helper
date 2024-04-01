import { Context, Next } from "hono";

export const AppendContentTypeApplicationProblemJsonMiddleware = async (c: Context, next: Next) => {
    try {
        await next();
    } catch (error) {
        c.header("Content-Type", "application/problem+json")
    }
}
