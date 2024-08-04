import User from '../Models/UserModel.js';
import { loginModel } from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    const { nama, email, password, confirmPassword } = req.body


    let result = {

        email: {
            value: email,
            message: null
        },
    }



    try {
        const uniqueEmail = await User.findOne({
            where: {
                email: email
            }
        })
        console.log(nama)
        if (uniqueEmail) {
            result.email.message = "Email sudah terdaftar!"
            return res.status(200).json(result)
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)
        await User.create({ nama, email, password: hashPassword })
        res.status(200).json(result)

    } catch (e) {
        res.status(500).json(e.message)
    }
}

export const isAvailableEmail = async (req, res) => {
    try {
        const result = await User.findAll({
            where: {
                email: req.query.search,
            },
        });
        return res.status(200).json({ isAvailable: (result.length > 0) ? false : true });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const checkEmail = async (req, res) => {
    try {
        const result = await User.findAll({
            where: {
                email: req.query.search,
            },
        });
        console.log(result)
        return res.status(200).json({ checkEmailExists: (result.length > 0) ? true : false });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const account = await User.findOne({ where: { email } })
        if (!account) {
            return res.status(401).json({ message: "Email atau password salah!", status: false })
        }
        const passwordValidate = await bcrypt.compare(password, account.password);
        if (!passwordValidate) {
            return res.status(401).json({ message: "Email atau password salah!pass", status: false })
        }
        // result.status = (bcrypt.compare(password, account.password, (err, result) => result))
        const payload = {
            id: account.id,
            nama: account.nama,
            email: account.email,
        }

        const secret = process.env.JWT_SECRET
        const expiresIn = "24h"
        const token = jwt.sign(payload, secret, { expiresIn })

        return res.status(200).json({
            data: {
                id: payload.id,
                nama: payload.nama,
                email: payload.email,
                status: true
            },
            token
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
