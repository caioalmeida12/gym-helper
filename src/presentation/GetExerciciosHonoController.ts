import { IExercicioQuery } from "@/domain/entities/IExercicio";
import { ExercicioUseCase } from "@/infrastructure/use_cases/ExercicioUseCase";
import { Context, Env, Next } from "hono";
import { JSendSpec } from "@/domain/libs/APIResponse";
import IExercicioRepository from "@/domain/repositories/IExercicioRepository";
import { BlankInput } from "hono/types";

export class GetExerciciosHonoController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async findAll(repository: IExercicioRepository, c: Context<Env, "/exercicio", BlankInput>, next: Next) {
        const useCase = new ExercicioUseCase(repository);

        const data = await useCase.findAll();

        const response: JSendSpec<IExercicioQuery[]> = {
            status: "success",
            data
        };

        return c.json(response);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async findById(repository: IExercicioRepository, c: Context<Env, "/exercicio/:id", BlankInput>, next: Next) {
        const useCase = new ExercicioUseCase(repository);

        const data = await useCase.findById(c.req.param("id"));

        const response: JSendSpec<IExercicioQuery> = {
            status: "success",
            data
        };

        return c.json(response);
    }
}