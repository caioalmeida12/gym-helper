import { IExercicioCommand, IExercicioQuery } from "../entities/IExercicio";

interface IExercicioRepository {
    create(data: IExercicioCommand): Promise<IExercicioQuery>;
    findById(id: string): Promise<IExercicioQuery | null>;
    findAll(): Promise<IExercicioQuery[]>;
    update(id: string, data: IExercicioCommand): Promise<IExercicioQuery | null>;
    delete(id: string): Promise<number>;
}

export default IExercicioRepository;