import { ESupportedDatabaseDrivers } from "@/domain/database/IDatabaseSingletonFactory";
import { DatabaseSingletonFactory } from "@/infrastructure/database/DatabaseFactory"

const chosenDatabase = ESupportedDatabaseDrivers.POSTGRES;

const connectDatabaseHelper = async (driver: ESupportedDatabaseDrivers) => {
    const databaseFactory = new DatabaseSingletonFactory();
    const database = await databaseFactory.createDatabase(driver)
    return await database.connect().then((res) => {
        console.log(`Connected to the database: ${driver}`)

        return res
    })
}

export { connectDatabaseHelper, chosenDatabase }