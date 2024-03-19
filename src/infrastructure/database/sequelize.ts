import { Sequelize, importModels } from '@sequelize/core';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const sequelize = new Sequelize('sqlite::memory:', {
  models: await importModels(__dirname + '/**/*.model.{ts,js}'),
});