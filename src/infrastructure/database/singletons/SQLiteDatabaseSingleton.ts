import { IDatabaseSingleton } from "@/domain/entities/IDatabaseSingleton";
import { Sequelize } from '@sequelize/core';
import { IDatabase } from "@/domain/entities/IDatabase";

import { AllModelsArray } from "../models";

class SQLiteDatabaseSingleton implements IDatabaseSingleton {
    private static instance: IDatabase;

    async getInstance(): Promise<IDatabase> {
        if (!SQLiteDatabaseSingleton.instance) {
            const sequelize = new Sequelize('sqlite::memory:', {
                models: AllModelsArray,
                logging: false,
                storage: './src/infrastructure/database/singletons/database.sqlite3'
            });

            const database: IDatabase = {
                connect: () => sequelize.sync({
                    force: true
                }).then((res) => {
                    console.log('SQLite database connected!')

                    return res
                })
            };

            SQLiteDatabaseSingleton.instance = database;
        }

        return SQLiteDatabaseSingleton.instance
    }
}

export { SQLiteDatabaseSingleton }