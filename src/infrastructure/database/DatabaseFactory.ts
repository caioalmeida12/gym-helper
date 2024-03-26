import { IDatabase } from "@/domain/database/IDatabase"
import { IDatabaseSingletonFactory, ESupportedDatabaseDrivers } from "@/domain/database/IDatabaseSingletonFactory"
import { SQLiteDatabaseSingleton } from "./singletons/SQLiteDatabaseSingleton"
import { PostgreSQLDatabaseSingleton } from "./singletons/PostgreSQLDatabaseSingleton";

class DatabaseSingletonFactory implements IDatabaseSingletonFactory {
    createDatabase(driver: ESupportedDatabaseDrivers): Promise<IDatabase> {
        switch (driver) {
            case ESupportedDatabaseDrivers.SQLITE:
                return new SQLiteDatabaseSingleton().getInstance()
            case ESupportedDatabaseDrivers.POSTGRES:
                return new PostgreSQLDatabaseSingleton().getInstance()
        }
    }
}

export { DatabaseSingletonFactory }