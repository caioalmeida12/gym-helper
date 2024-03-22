import { HTTPException } from "hono/http-exception";
import { StatusCode } from "hono/utils/http-status";

interface ErrorProps {
    res?: Response;
    type: string;
    title: string;
    detail: string;
    instance: string;
    [key: string]: any;
}

export class ApplicationProblemJsonError extends HTTPException {
    readonly type: string;
    readonly title: string;
    readonly detail: string;
    readonly instance: string;
    [key: string]: any;

    constructor(props: ErrorProps, message?: StatusCode) { 
        super(message, props);
    
        this.type = props.type;
        this.title = props.title;
        this.detail = props.detail;
        this.instance = props.instance;
        Object.keys(props).forEach((key: string) => {
            this[key] = props[key];
        });
     }
}