import { ESupportedDatabaseDrivers } from "@/domain/entities/IDatabaseSingletonFactory";
import { DatabaseSingletonFactory } from "@/infrastructure/database/DatabaseFactory"

const chosenDatabase = ESupportedDatabaseDrivers.SQLITE;

const connectDatabaseHelper = async (driver: ESupportedDatabaseDrivers) => {
    const databaseFactory = new DatabaseSingletonFactory();
    const database = await databaseFactory.createDatabase(driver)
    return await database.connect()
}

export { connectDatabaseHelper, chosenDatabase }