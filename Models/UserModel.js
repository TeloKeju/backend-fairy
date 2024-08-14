import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import validator from "validator";
import bcrypt from 'bcrypt';

const { DataTypes } = Sequelize;

const User = db.define("users",
    {
        "nama": DataTypes.STRING,
        "email": DataTypes.STRING,
        "password": DataTypes.STRING,
        "role": DataTypes.STRING,
        "isActive": DataTypes.STRING,
        "resetPassword": DataTypes.STRING,
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
    // console.log(rows)

    return credentials
}

export default User;
export { loginModel }

(async () => {
    await db.sync()
})()