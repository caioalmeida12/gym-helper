import { IExercicioQuery } from "@/domain/entities/IExercicio";
import { ExercicioUseCase } from "@/infrastructure/use_cases/ExercicioUseCase";
import { Context, Next } from "hono";
import { JSendSpec } from "@/domain/libs/APIResponse";
import IExercicioRepository from "@/domain/repositories/IExercicioRepository";
import ExercicioZodDTO from "@/infrastructure/dtos/ExercicioZodDTO";
import { ZodError } from "zod";

export class PostExerciciosHonoController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async create(repository: IExercicioRepository, c: Context, next: Next) {
        const useCase = new ExercicioUseCase(repository);

        try {
            const parsed = ExercicioZodDTO.omit({ id: true }).parse(await c.req.json());

            const data = await useCase.create(parsed);

            const response: JSendSpec<IExercicioQuery> = {
                status: "success",
                data
            };

            console.log("PostExerciciosHonoController OK-> ", response)

            return c.json(response);

        } catch (error) {
            console.log("PostExerciciosHonoController ERROR -> ", error instanceof ZodError)

            throw error;
        }
    }
}