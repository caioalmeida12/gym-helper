import { Context, Next } from "hono";
import { ZodError } from "zod";
import { ApplicationProblemJsonError } from "../libs/ApplicationProblemJson";

export const ZodErrorMiddleware = async (c: Context, next: Next) => {
    try {
        await next();
    } catch (error) {
        if (!(error instanceof ZodError)) throw error;

        throw new ApplicationProblemJsonError({
            detail: "Alguma das informações não foi fornecida de acordo com o esperado.",
            status: 400,
            fields: error.errors
        });
    }
}