import { IApplicationProblemJson } from "../../domain/libs/IApplicationProblemJson";
import { HTTP_STATUS_CODE_NUMBERS } from "../../domain/libs/THTTPStatusCodeNumbers";

export class ApplicationProblemJsonError implements IApplicationProblemJson {
    [key: string]: unknown;
    declare type: string;
    declare title: string;
    declare status: HTTP_STATUS_CODE_NUMBERS;
    declare detail: string;
    declare instance: string;

    constructor(data: IApplicationProblemJson) {
        Object.keys(data).forEach((key: string) => {
            this[key] = data[key];
        });
    }
}