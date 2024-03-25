import { IExercicioQuery } from "@/domain/entities/IExercicio";
import { ExercicioUseCase } from "@/infrastructure/use_cases/ExercicioUseCase";
import { Context, Env, Next } from "hono";
import { JSendSpec } from "@/domain/libs/APIResponse";
import IExercicioRepository from "@/domain/repositories/IExercicioRepository";
import { BlankInput } from "hono/types";
import { ApplicationProblemJsonError } from "@/infrastructure/libs/ApplicationProblemJson";
import ExercicioZodDTO from "@/infrastructure/dtos/ExercicioZodDTO";
import { ZodError } from "zod";

export class GetExerciciosHonoController {
    static async findAll(repository: IExercicioRepository, c: Context<Env, "/exercicio", BlankInput>, next: Next) {
        try {
            const useCase = new ExercicioUseCase(repository);

            const data = await useCase.findAll();

            const response: JSendSpec<IExercicioQuery[]> = {
                status: "success",
                data
            };

            return c.json(response);
        } catch (error) {
            await next();
        }
    }

    static async findById(repository: IExercicioRepository, c: Context<Env, "/exercicio/:id", BlankInput>, next: Next) {
        try {
            const useCase = new ExercicioUseCase(repository);
            const id = ExercicioZodDTO.pick({ id: true }).parse(c.req.param("id")).id;

            const data = await useCase.findById(id);

            if (!data.id) throw new ApplicationProblemJsonError({
                detail: "Exercício não encontrado.",
                instance: c.req.url,
                status: 404,
                title: "Exercício com o id fornecido não foi encontrado.",
                type: "https://httpstatuses.com/404"
            })

            const response: JSendSpec<IExercicioQuery> = {
                status: "success",
                data
            };

            return c.json(response);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ApplicationProblemJsonError({
                    detail: error.message,
                    instance: c.req.url,
                    status: 404,
                    title: "Erro de validação: id inválido.",
                    type: "https://httpstatuses.com/400"
                })
            }

            await next();
        }
    }
}