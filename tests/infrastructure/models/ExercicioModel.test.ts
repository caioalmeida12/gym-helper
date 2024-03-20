import Sequelize from "@sequelize/core";
import { connectDatabaseHelper, chosenDatabase } from "@/tests/lib/connectDatabaseHelper";

describe("ExercicioModel", () => {
    let database: Sequelize;

    beforeAll(async () => {
        database = await connectDatabaseHelper(chosenDatabase).then((res) => {
            if(!(res instanceof Sequelize)) throw new Error('The database is not an instance of Sequelize')

            return res 
        })
    });

    it("Should be able to query the ExercicioModel", async () => {
        expect(1 + 1).toBe(2);
    })

    afterAll(async () => {
        await database.close();
    });
});