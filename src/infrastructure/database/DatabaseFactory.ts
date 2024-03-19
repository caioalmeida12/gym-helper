import { IDatabase } from "@/domain/entities/IDatabase"
import { IDatabaseSingletonFactory, ESupportedDatabaseDrivers } from "@/domain/entities/IDatabaseSingletonFactory"
import { SQLiteDatabaseSingleton } from "./singletons/SQLiteDatabaseSingleton"

class DatabaseSingletonFactory implements IDatabaseSingletonFactory {
    createDatabase(driver: ESupportedDatabaseDrivers): Promise<IDatabase> {
        switch (driver) {
            case ESupportedDatabaseDrivers.SQLITE:
                return new SQLiteDatabaseSingleton().getInstance()
        }
    }
}

export { DatabaseSingletonFactory }