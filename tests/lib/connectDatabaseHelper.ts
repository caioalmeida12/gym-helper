import { ESupportedDatabaseDrivers } from "@/domain/database/IDatabaseSingletonFactory";
import { DatabaseSingletonFactory } from "@/infrastructure/database/DatabaseFactory"
import Sequelize from "@sequelize/core";

const chosenDatabase = ESupportedDatabaseDrivers.SQLITE;

const connectDatabaseHelper = async (driver: ESupportedDatabaseDrivers) => {
    const databaseFactory = new DatabaseSingletonFactory();
    const database = await databaseFactory.createDatabase(driver)
    return await database.connect().then((res) => {
        if (!(res instanceof Sequelize)) throw new Error('The database is not an instance of Sequelize')

        return res
    })
}

export { connectDatabaseHelper, chosenDatabase }