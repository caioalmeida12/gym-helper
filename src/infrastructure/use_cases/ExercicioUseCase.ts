import { IExercicioCommand, IExercicioQuery } from "@/domain/entities/IExercicio";
import ISequelizeRepository from "@/domain/repositories/ISequelizeRepository";
import IUseCase from "@/domain/use_cases/IExercicioUseCase";
import { ApplicationProblemJsonError } from "../lib/ApplicationProblemJson";

export class ExercicioUseCase implements IUseCase<IExercicioCommand, IExercicioQuery> {
  constructor(private repository: ISequelizeRepository<IExercicioCommand, IExercicioQuery>) { }
  
  async findAll(): Promise<IExercicioQuery[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<IExercicioQuery> {
    const result = await this.repository.findById(id);

    if (!result) {
      throw new ApplicationProblemJsonError({
        type: "https://httpstatuses.com/404",
        title: "Not Found",
        detail: "Exercicio not found",
        instance: "https://httpstatuses.com/404"
      }, 404);
    }

    return result;
  }

  async create(data: IExercicioCommand): Promise<IExercicioQuery> {
    return await this.repository.create(data);
  }

  update(id: string, data: IExercicioCommand): Promise<IExercicioQuery> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
}