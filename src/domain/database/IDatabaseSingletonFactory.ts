import { IDatabase } from "./IDatabase"

enum ESupportedDatabaseDrivers {
    SQLITE = 'sqlite',
    POSTGRES = 'postgres'
}

interface IDatabaseSingletonFactory {
    createDatabase(driver: ESupportedDatabaseDrivers): Promise<IDatabase>
}

export { IDatabaseSingletonFactory, ESupportedDatabaseDrivers }