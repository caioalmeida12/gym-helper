import { IDatabase } from "./IDatabase"

enum ESupportedDatabaseDrivers {
    SQLITE = 'sqlite',
}

interface IDatabaseSingletonFactory {
    createDatabase(driver: ESupportedDatabaseDrivers): Promise<IDatabase>
}

export { IDatabaseSingletonFactory, ESupportedDatabaseDrivers }