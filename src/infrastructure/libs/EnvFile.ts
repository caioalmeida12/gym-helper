import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

/**
 * Custom error class for representing an environment variable that is not set.
 */
export class EnvVariableNotSetError extends Error {
    constructor(envFilePath: string, envVar: string) {
        super(`Environment variable in ${envFilePath} is not set: ${envVar}`);
    }
}

/**
 * Loads environment variables from a dotenv file and logs their values.
 * @param fileNames - The path to the dotenv file or an array of paths.
 * @throws {EnvVariableNotSetError} If a required environment variable is not set.
 */
export function envLogger(fileNames: string[] | string): void {
    const files = Array.isArray(fileNames) ? fileNames : [fileNames];

    files.forEach(fileName => {
        const dotenvPath = path.resolve(fileName);
        dotenv.config({ path: dotenvPath });

        const content = fs.readFileSync(dotenvPath, 'utf-8');
        const envVariables = dotenv.parse(content);

        Object.entries(envVariables).forEach(([key, value]) => {
            if (!value) {
                throw new EnvVariableNotSetError(dotenvPath, key);
            }

            console.log(`✅ [${fileName}]: ${key} = ${value}`);
        });
    });
}