import { ApplicationProblemJsonError } from "@/infrastructure/libs/ApplicationProblemJson";

describe("ApplicationProblemJsonError", () => {

    it("Should be able to instantiate a new ApplicationProblemJsonError without custom fields", () => {
        const result = new ApplicationProblemJsonError({
            type: "https://httpstatuses.com/404",
            title: "Not Found",
            detail: "Exercicio not found",
            instance: "https://httpstatuses.com/exericio/aasdasd",
            status: 404
        });

        expect(result).toBeInstanceOf(ApplicationProblemJsonError);
    });

    it("Should be able to instantiate a new ApplicationProblemJsonError without custom fields and return a json", () => {
        const result = new ApplicationProblemJsonError({
            type: "https://httpstatuses.com/404",
            title: "Not Found",
            detail: "Exercicio not found",
            instance: "https://httpstatuses.com/exericio/aasdasd",
            status: 404
        });

        expect(result).toBeInstanceOf(ApplicationProblemJsonError);
        expect(result).toEqual({
            type: "https://httpstatuses.com/404",
            title: "Not Found",
            detail: "Exercicio not found",
            instance: "https://httpstatuses.com/exericio/aasdasd",
            status: 404
        });
    });

    it("Should be able to instantiate a new ApplicationProblemJsonError with custom fields", () => {
        const result = new ApplicationProblemJsonError({
            type: "https://httpstatuses.com/404",
            title: "Not Found",
            detail: "Exercicio not found",
            instance: "https://httpstatuses.com/exericio/aasdasd",
            status: 404,
            customField: "customField"
        });

        expect(result).toBeInstanceOf(ApplicationProblemJsonError);
        expect(result.customField).toBe("customField");
    });

    it("Should be able to instantiate a new ApplicationProblemJsonError with custom fields and return a json", () => {
        const result = new ApplicationProblemJsonError({
            type: "https://httpstatuses.com/404",
            title: "Not Found",
            detail: "Exercicio not found",
            instance: "https://httpstatuses.com/exericio/aasdasd",
            status: 404,
            customField: "customField"
        });

        expect(result).toBeInstanceOf(ApplicationProblemJsonError);
        expect(result).toEqual({
            type: "https://httpstatuses.com/404",
            title: "Not Found",
            detail: "Exercicio not found",
            instance: "https://httpstatuses.com/exericio/aasdasd",
            status: 404,
            customField: "customField"
        });
    });
});