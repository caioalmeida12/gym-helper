interface IDatabase {
    connect: () => Promise<unknown>
}

export { IDatabase }