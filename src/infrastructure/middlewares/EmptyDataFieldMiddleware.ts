import { JSendSpec } from "@/domain/libs/APIResponse";
import { Context, Next } from "hono";
import { ApplicationProblemJsonError } from "../libs/ApplicationProblemJson";

export const EmptyDataFieldMiddleware = async (c: Context, next: Next) => {
    await next();

    if (!c.res.ok) return;

    const response: JSendSpec = await c.res.json()

    if (response.status === "success" && Array.isArray(response.data) && response.data.length === 0) {
        throw new ApplicationProblemJsonError({
            detail: "Nenhum dado encontrado.",
            instance: c.req.url,
            status: 404,
            title: "Nenhum dado encontrado.",
            type: "https://httpstatuses.com/404"
        })
    }
}