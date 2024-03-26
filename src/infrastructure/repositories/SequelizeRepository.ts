/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Model, ModelStatic, CreationAttributes } from "@sequelize/core";
import ISequelizeRepository from "@/domain/repositories/ISequelizeRepository";

export class SequelizeRepository<Command, Query> implements ISequelizeRepository<Command, Query> {
    constructor(private model: ModelStatic<Model<any, any>>) {}

    async create(data: Command): Promise<Query> {
        return (await this.model.create(data as CreationAttributes<Model<any, any>>)).get()
    }

    async findById(id: string): Promise<Query | null> {
        return (await this.model.findByPk(id))?.get() ?? null
    }

    async findAll(): Promise<Query[]> {
        return (await this.model.findAll()).map((item) => item.get())
    }

    async update(id: string, data: Command): Promise<Query | null> {
        const [rowsAffected] = await this.model.update(data as CreationAttributes<Model<any, any>>, { where: { id } });
        return rowsAffected ? await this.findById(id) : null;
    }

    async delete(id: string): Promise<number> {
        return await this.model.destroy({ where: { id } });
    }
}