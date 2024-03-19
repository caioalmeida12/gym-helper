import { ExercicioCommand, ExercicioQuery } from "../entities/IExercicio";

interface IExercicioRepository {
    create(data: ExercicioQuery): Promise<ExercicioCommand>;
    findById(id: string): Promise<ExercicioQuery | undefined>;
    findAll(): Promise<ExercicioQuery[]>;
    update(id: string, data: ExercicioQuery): Promise<ExercicioCommand>;
    delete(id: string): Promise<void>;
}

export default IExercicioRepository;