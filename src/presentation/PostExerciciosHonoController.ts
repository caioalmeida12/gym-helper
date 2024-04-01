import { IExercicioQuery } from "@/domain/entities/IExercicio";
import { ExercicioUseCase } from "@/infrastructure/use_cases/ExercicioUseCase";
import { Context, Next } from "hono";
import { JSendSpec } from "@/domain/libs/APIResponse";
import IExercicioRepository from "@/domain/repositories/IExercicioRepository";
import ExercicioZodDTO from "@/infrastructure/dtos/ExercicioZodDTO";

export class PostExerciciosHonoController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async create(repository: IExercicioRepository, c: Context, next: Next) {
        const useCase = new ExercicioUseCase(repository);

        const json = ExercicioZodDTO.parse(c.req.json());

        const data = await useCase.create(json);

        const response: JSendSpec<IExercicioQuery> = {
            status: "success",
            data
        };

        return c.json(response);
    }
}