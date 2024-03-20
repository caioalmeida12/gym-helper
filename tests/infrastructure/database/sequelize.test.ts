import { ESupportedDatabaseDrivers } from "@/domain/entities/IDatabaseSingletonFactory";
import { DatabaseSingletonFactory } from "@/infrastructure/database/DatabaseFactory";
import Sequelize, { sql } from "@sequelize/core";

const chosenDatabase = ESupportedDatabaseDrivers.SQLITE;

describe("Should correctly connect to the databases", () => {
    describe("Should connect to the chosen database: " + chosenDatabase, () => {
        let database: Sequelize;

        beforeAll(async () => {
            database = await connectDatabaseHelper(chosenDatabase).then((res) => {
                if(!(res instanceof Sequelize)) throw new Error('The database is not an instance of Sequelize')

                return res 
            })
        });

        it("Should connect to the chosen database", async () => {
            expect(database).toBeInstanceOf(Sequelize);
            expect(database.dialect.name).toBe(chosenDatabase);
        });

        it("Should load the models correctly", async () => {
            const models = database.models

            expect(models).toBeDefined();
            expect(models.size).toBeGreaterThan(0);
        });

        it("Should be able to query the database", async () => {
            const result = await database.query(sql`SELECT 1 + 1 AS result;`);

            expect(result).toBeDefined();
            expect(result[0][0]).toHaveProperty('result');
            expect((result[0][0] as any).result).toBe(2);
        })

        afterAll(async () => {
            await database.close();
        });
    });
});

const connectDatabaseHelper = async (driver: ESupportedDatabaseDrivers) => {
    const databaseFactory = new DatabaseSingletonFactory();
    const database = await databaseFactory.createDatabase(driver)
    return await database.connect()
}