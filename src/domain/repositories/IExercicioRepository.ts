import { IExercicioCommand, IExercicioQuery } from "../entities/IExercicio";

interface IExercicioRepository {
    create(data: IExercicioQuery): Promise<IExercicioCommand>;
    findById(id: string): Promise<IExercicioQuery | undefined>;
    findAll(): Promise<IExercicioQuery[]>;
    update(id: string, data: IExercicioQuery): Promise<IExercicioCommand>;
    delete(id: string): Promise<void>;
}

export default IExercicioRepository;