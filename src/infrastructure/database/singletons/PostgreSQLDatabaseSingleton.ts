import { IDatabaseSingleton } from "@/domain/database/IDatabaseSingleton";
import { Sequelize } from '@sequelize/core';
import { IDatabase } from "@/domain/database/IDatabase";

import { AllModelsArray } from "../models";

class PostgreSQLDatabaseSingleton implements IDatabaseSingleton {
    private static instance: IDatabase;

    async getInstance(): Promise<IDatabase> {
        if (!PostgreSQLDatabaseSingleton.instance) {
            const sequelize = new Sequelize('postgresql://postgres:FzTHUDLsBqPLtJDcnVKydnzvsTKEeTAT@viaduct.proxy.rlwy.net:24889/railway',{
                models: AllModelsArray,
                // logging: false,
            });

            const database: IDatabase = {
                connect: () => sequelize.sync({
                    force: true
                }).then((res) => {
                    console.log('PostgreSQL database connected!')

                    return res
                })
            };

            PostgreSQLDatabaseSingleton.instance = database;
        }

        return PostgreSQLDatabaseSingleton.instance
    }
}

export { PostgreSQLDatabaseSingleton }