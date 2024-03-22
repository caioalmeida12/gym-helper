interface IUseCase<ICommand, IQuery> {
    create(data: ICommand): Promise<IQuery>;
    findAll(): Promise<IQuery[]>;
    findById(id: string): Promise<IQuery>;
    update(id: string, data: ICommand): Promise<IQuery>;
    delete(id: string): Promise<number>;
}

export default IUseCase;
