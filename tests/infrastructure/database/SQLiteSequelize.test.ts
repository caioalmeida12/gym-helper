import { ESupportedDatabaseDrivers } from "@/domain/database/IDatabaseSingletonFactory";
import { connectDatabaseHelper } from "@/tests/lib/connectDatabaseHelper";
import Sequelize, { sql } from "@sequelize/core";

describe("SQLiteSequelize", () => {
    describe("Should connect to the chosen database: " + ESupportedDatabaseDrivers.SQLITE, () => {
        let database: Sequelize;

        beforeAll(async () => {
            database = await connectDatabaseHelper(ESupportedDatabaseDrivers.SQLITE).then((res) => {
                if(!(res instanceof Sequelize)) throw new Error('The database is not an instance of Sequelize')

                return res 
            })
        });

        it("Should connect to the chosen database", async () => {
            expect(database).toBeInstanceOf(Sequelize);
            expect(database.dialect.name).toBe(ESupportedDatabaseDrivers.SQLITE);
        });

        it("Should load the models correctly", async () => {
            const models = database.models

            expect(models).toBeDefined();
            expect(models.size).toBeGreaterThan(0);
        });

        it("Should be able to query the database", async () => {
            const result = (await database.query(sql`SELECT 1 + 1 AS result;`))[0] as { result: number }[];

            expect(result).toBeDefined();
            expect(result[0]).toHaveProperty('result');
            expect(result[0].result).toBe(2);
        })
    });
});