import { Sequelize } from "@sequelize/core";

const sequelize = new Sequelize("sqlite::memory:")

export default sequelize;
