import db from "../config/Database.js";
import ForumQuiz from "./forumQuizModel.js";
import User from "./UserModel.js";
import { Sequelize } from "sequelize";


const { DataTypes } = Sequelize;

const RekapNilaiModel = db.define(
  "rekapNilai",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Forum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ForumQuiz",
        key: "id",
      },
    },
    id_User: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    nilai: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default RekapNilaiModel;

RekapNilaiModel.hasOne(ForumQuiz , {foreignKey : "id" , sourceKey : "id_Forum"});
ForumQuiz.belongsTo(RekapNilaiModel, {
  foreignKey: "id",
  sourceKey: "id_Forum",
});

RekapNilaiModel.hasOne(User , {foreignKey : "id" , sourceKey : "id_User"});
User.belongsTo(RekapNilaiModel, {
  foreignKey: "id",
  sourceKey: "id_User",
})