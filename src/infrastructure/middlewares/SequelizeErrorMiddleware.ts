import { HTTP_STATUS_CODE_NUMBERS } from "@/domain/libs/THTTPStatusCodeNumbers";
import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { ApplicationProblemJsonError } from "../libs/ApplicationProblemJson";

const errorsThatShouldBeHandled = [
    "SequelizeValidationError",
    "SequelizeUniqueConstraintError"
];

export const SequelizeErrorMiddleware = async (c: Context, next: Next) => {
    try {
        await next();
    } catch (error: any) {
        if (!(errorsThatShouldBeHandled.includes(error.name))) throw error;

        const errorStatusByName: Record<string, number> = {
            SequelizeValidationError: 400,
            SequelizeUniqueConstraintError: 409
        };

        const thisErrorStatus = errorStatusByName[error.name];

        c.status(thisErrorStatus as StatusCode)

        if (error.name == "SequelizeValidationError") {
            throw new ApplicationProblemJsonError({
                detail: "Alguma das informações não foi fornecida de acordo com o esperado.",
                status: thisErrorStatus as HTTP_STATUS_CODE_NUMBERS,
                fields: error.errors
            });
        }

        if (error.name == "SequelizeUniqueConstraintError") {
            throw new ApplicationProblemJsonError({
                detail: "Alguma das informações fornecidas já se encontra vinculada a outro exercício.",
                status: thisErrorStatus as HTTP_STATUS_CODE_NUMBERS,
                fields: error.errors
            });
        }
    }
}