import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const history = db.define(
    "history",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_user: {
            type: Sequelize.INTEGER
        }
    },
    { freezeTableName: true }
);

export default Dongeng;

(async () => {
    await db.sync();
})();
