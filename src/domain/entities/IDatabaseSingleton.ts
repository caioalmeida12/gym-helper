import { IDatabase } from "./IDatabase"

interface IDatabaseSingleton {
    getInstance(): Promise<IDatabase> 
}

export { IDatabaseSingleton }