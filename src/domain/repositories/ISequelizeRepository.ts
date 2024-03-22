interface ISequelizeRepository<ISequelizeCommand, ISequelizeQuery> {
    create(data: ISequelizeCommand): Promise<ISequelizeQuery>;
    findById(id: string): Promise<ISequelizeQuery | null>;
    findAll(): Promise<ISequelizeQuery[]>;
    update(id: string, data: ISequelizeCommand): Promise<ISequelizeQuery | null>;
    delete(id: string): Promise<number>;
}

export default ISequelizeRepository;