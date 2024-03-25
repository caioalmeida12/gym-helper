import { Context, Next } from "hono";
import { ApplicationProblemJsonError } from "../libs/ApplicationProblemJson";
import { JSendSpec } from "@/domain/libs/APIResponse";

export const ApplicationProblemJsonMiddleware = async (c: Context, next: Next) => {
    try {
        await next();
    } catch (error) {
        if (!(error instanceof ApplicationProblemJsonError)) throw error;

        c.res = new Response(
            JSON.stringify(
                {
                    status: (error.status >= 500) ? "error" : "fail",
                    data: null,
                    message: error
                } as JSendSpec
            ), {
                headers: {
                    "Content-Type": "application/problem+json",
                    ...c.res.headers
                },
                status: error.status
            }
        )
    }
}