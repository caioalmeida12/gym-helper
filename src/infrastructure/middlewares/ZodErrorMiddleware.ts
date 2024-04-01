import { Context, Next } from "hono";
import { ZodError } from "zod";

export const ZodErrorMiddleware = async (c: Context, next: Next) => {
    try {
        await next();
    } catch (error) {
        if (!(error instanceof ZodError)) throw error;

        c.status(400);
        c.res = c.json({
            status: "fail",
            data: null,
            message: error.errors
        });
    }
}