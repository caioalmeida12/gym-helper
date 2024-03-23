import { HTTP_STATUS_CODE_NUMBERS } from "@/domain/entities/THTTPStatusCodeNumbers";

export interface IApplicationProblemJson {
    type: string;
    title: string;
    status: HTTP_STATUS_CODE_NUMBERS;
    detail: string;
    instance: string;
    [key: string]: unknown;
}
