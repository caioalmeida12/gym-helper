import { TypedResponse } from "hono";
import { IApplicationProblemJson } from "./IApplicationProblemJson";

type SuccessResponse<Query> = {
    status: "success";
    data: Query | Query[];
    message?: string;
};

type FailResponse = {
    status: "fail";
    data: unknown;
    message: IApplicationProblemJson
};

type ErrorResponse = {
    status: "error";
    message: IApplicationProblemJson;
};

export type JSendSpec<Query = unknown> = SuccessResponse<Query> | FailResponse | ErrorResponse;
export type APIResponse<Query = unknown> = Promise<(Response & TypedResponse<JSendSpec<Query>>) | undefined>;