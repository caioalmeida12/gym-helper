import IExercicioRepository from "@/domain/repositories/IExercicioRepository";
import { IExercicioCommand, IExercicioQuery } from "@/domain/entities/IExercicio";
import { ExercicioModel } from "../database/models/ExercicioModel";

export class ExercicioSequelizeRepository implements IExercicioRepository {
    constructor(private readonly _db: typeof ExercicioModel) {
        this._db = _db;
    }

    async create(data: IExercicioCommand): Promise<IExercicioQuery> {
        return await this._db.create(data) 
    }

    async findById(id: IExercicioQuery["id"]): Promise<IExercicioQuery | null> {
        return await this._db.findByPk(id);
    }

    async findAll(): Promise<IExercicioQuery[]> {
        return await this._db.findAll();
    }

    async update(id: IExercicioQuery["id"], data: IExercicioCommand): Promise<IExercicioQuery | null> {
        const existing = await this._db.findByPk(id)

        if (!existing?.toJSON()) return null;

        const updated = await existing?.update(data)

        if (!updated) return null;

        return updated?.toJSON()
    }

    async delete(id: IExercicioQuery["id"]): Promise<number> {
        return await this._db.destroy({
            where: {
                id
            }
        })
    }
}