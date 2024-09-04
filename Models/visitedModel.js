import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";


const visited = db.define("visited",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    { freezeTableName: true }
)

export default visited;

(async () => {
    await db.sync()
})()