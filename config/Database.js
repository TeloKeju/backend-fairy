import { Sequelize } from "sequelize";

const db = new Sequelize("dongeng", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

export default db;