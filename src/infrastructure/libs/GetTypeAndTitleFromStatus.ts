export const GetTypeAndTitleFromStatus = (status: number) => {
    const statusDict: { [key: number]: { title: string; type: string; }; } = {
        400: {
            title: "Bad Request",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400"
        },
        401: {
            title: "Unauthorized",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401"
        },
        403: {
            title: "Forbidden",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403"
        },
        404: {
            title: "Not Found",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404"
        },
        405: {
            title: "Method Not Allowed",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405"
        },
        406: {
            title: "Not Acceptable",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406"
        },
        408: {
            title: "Request Timeout",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408"
        },
        409: {
            title: "Conflict",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409"
        },
        410: {
            title: "Gone",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410"
        },
        411: {
            title: "Length Required",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411"
        },
        412: {
            title: "Precondition Failed",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412"
        },
        413: {
            title: "Payload Too Large",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413"
        },
        414: {
            title: "URI Too Long",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414"
        },
        415: {
            title: "Unsupported Media Type",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415"
        },
        416: {
            title: "Range Not Satisfiable",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416"
        },
        417: {
            title: "Expectation Failed",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417"
        },
        418: {
            title: "I'm a teapot",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418"
        },
        421: {
            title: "Misdirected Request",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421"
        },
        422: {
            title: "Unprocessable Entity",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422"
        },
        423: {
            title: "Locked",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423"
        },
        424: {
            title: "Failed Dependency",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424"
        },
        425: {
            title: "Too Early",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425"
        },
        426: {
            title: "Upgrade Required",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426"
        },
        428: {
            title: "Precondition Required",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428"
        },
        429: {
            title: "Too Many Requests",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429"
        },
        431: {
            title: "Request Header Fields Too Large",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431"
        },
        451: {
            title: "Unavailable For Legal Reasons",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451"
        },
        500: {
            title: "Internal Server Error",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500"
        },
        501: {
            title: "Not Implemented",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501"
        },
        502: {
            title: "Bad Gateway",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502"
        },
        503: {
            title: "Service Unavailable",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503"
        },
        504: {
            title: "Gateway Timeout",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504"
        },
        505: {
            title: "HTTP Version Not Supported",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505"
        },
        506: {
            title: "Variant Also Negotiates",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506"
        },
        507: {
            title: "Insufficient Storage",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507"
        },
        508: {
            title: "Loop Detected",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508"
        },
        510: {
            title: "Not Extended",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510"
        },
        511: {
            title: "Network Authentication Required",
            type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511"
        },
    };

    return statusDict[status] || { title: "Unknown Error", type: "" };
};
