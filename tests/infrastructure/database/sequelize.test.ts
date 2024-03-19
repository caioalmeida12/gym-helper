import { ESupportedDatabaseDrivers } from "@/domain/entities/IDatabaseSingletonFactory";
import { DatabaseSingletonFactory } from "@/infrastructure/database/DatabaseFactory";
import Sequelize from "@sequelize/core";

const connectDatabaseHelper = async (driver: ESupportedDatabaseDrivers) => {
    const databaseFactory = new DatabaseSingletonFactory();
    const database = await databaseFactory.createDatabase(driver)
    return await database.connect()
}

describe("Should correctly connect to the database", () => {
    describe("Should connect to the sqlite database", () => {
        let database: Sequelize;

        beforeAll(async () => {
            database = await connectDatabaseHelper(ESupportedDatabaseDrivers.SQLITE).then((res) => {
                if(!(res instanceof Sequelize)) throw new Error('The database is not an instance of Sequelize')

                return res 
            })
        });

        it("Should connect to the sqlite database", async () => {
            expect(database).toBeInstanceOf(Sequelize);
            expect(database.dialect.name).toBe('sqlite');
        });

        it("Should load the models correctly", async () => {
            const models = database.models

            expect(models).toBeDefined();
            expect(models.size).toBeGreaterThan(0);
        });
    });
});