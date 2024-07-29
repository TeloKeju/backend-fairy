import User from '../Models/UserModel.js';
import bcrypt from "bcrypt"

export const getUser = async (req, res) => {
    try {
        const response = await User.findAll()
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}



export const getUserByID = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createUser = async (req, res) => {
    try {
        const { nama, email, password } = req.body
        const uniqueEmail = await User.findOne({ where: { email } })

        if (uniqueEmail) {
            return res.status(400).json({ email: "Email sudah di gunakan!" })
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)
        await User.create({
            nama,
            email,
            password: hashPassword
        })
        return res.status(200).json({ message: "User berhasil dibuat!" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

export const updateUser = async (req, res) => {

    try {
        if (req.body.password) {
            const { nama, email, password } = req.body
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt)
            const result = await User.update({ nama, email, hashPassword }, { where: { id: req.params.id } })
            res.status(200).json({ message: "User Berhasil di update" })
        } else {
            const { nama, email } = req.body
            const result = await User.update({ nama }, { where: { id: req.params.id } })
            res.status(200).json({ message: "User Berhasil di update" })
        }
    } catch (e) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        console.log(req.params.id)
        await User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "User Berhasil di Hapus!" })
    } catch (error) {
        console.log(error);
    }

}