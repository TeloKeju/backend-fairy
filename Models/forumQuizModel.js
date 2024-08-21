import db from "../config/Database.js";
import Dongeng from "./DongengModel.js";
import {Sequelize} from "sequelize";

const { DataTypes } = Sequelize

const ForumQuiz = db.define("forumQuiz", {
    id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    judul : {
        type: DataTypes.STRING,
        allowNull: false
    },
    idDongeng : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Dongeng",
            key: "id",
        }
    },
    sekolah : {
        type: DataTypes.STRING,
        allowNull: false
    },
    access_date : {
        type: DataTypes.DATE,
        allowNull: true
    },
    expired_date : {
        type: DataTypes.DATE,
        allowNull: true
    },
    token : {
        type: DataTypes.STRING, 
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default ForumQuiz

ForumQuiz.hasOne(Dongeng, { foreignKey: "id", sourceKey: "idDongeng" })
Dongeng.belongsTo(ForumQuiz, { foreignKey: "id", targetKey: "idDongeng" })
