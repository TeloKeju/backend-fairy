import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define("users",
    {
        "nama": DataTypes.STRING,
        "email": DataTypes.STRING,
        "password": DataTypes.STRING,
        "role": DataTypes.STRING,
        "isActive": DataTypes.STRING,
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