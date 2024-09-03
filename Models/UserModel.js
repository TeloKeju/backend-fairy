import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";


const User = db.define("users",
    {
        "nama": DataTypes.STRING,
        "username": {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        "email": DataTypes.STRING,
        "kelas": {
            type: DataTypes.STRING,
            allowNull: true,
        },
        "sekolah": {
            type: DataTypes.STRING,
            allowNull: true
        },
        "password": DataTypes.STRING,
        "role": DataTypes.STRING,
        "isActive": DataTypes.STRING,
        "refreshToken": DataTypes.STRING,
    },
    { freezeTableName: true }
)



const loginModel = async (email, password) => {
    const { count } = await User.findAndCountAll({ where: { email } })
    let credentials = {
        email: {
            value: email,
            error: (count === 0) ? "Email belum terdaftar" : null,
        },
        password: {
            value: password,
            error: null
        },
        status: (count === 0)
    }

    return credentials
}

export default User;
export { loginModel }

(async () => {
    await db.sync()
})()