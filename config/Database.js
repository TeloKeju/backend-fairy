import { Sequelize } from "sequelize";

const db = new Sequelize("split", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

export default db;