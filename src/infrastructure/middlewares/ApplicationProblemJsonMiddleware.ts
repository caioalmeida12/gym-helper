import { Context, Next } from "hono";
import { ApplicationProblemJsonError } from "../libs/ApplicationProblemJson";
import { JSendSpec } from "@/domain/libs/APIResponse";
import { GetTypeAndTitleFromStatus } from "../libs/GetTypeAndTitleFromStatus";

export const ApplicationProblemJsonMiddleware = async (c: Context, next: Next) => {
    try {
        await next();
    } catch (error) {
        if (!(error instanceof ApplicationProblemJsonError)) throw error;

        c.status(error.status)
        c.res = c.json<JSendSpec>({
            status: (error.status >= 500 ? "error" : "fail"),
            data: null,
            message: {
                ...error,
                ...GetTypeAndTitleFromStatus(error.status),
                instance: c.req.url
            }
        })
        c.header("Content-Type", "application/problem+json")
    }
}