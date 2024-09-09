import User from '../Models/UserModel.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const getHistory = (req, res) => {

}
export const updateHistory = async (req, res) => {
    const id = 9
    const book = 1
    const user = await User.findOne(
        {
            where: { id },
            attributes: ["history"]
        },
    )
    console.log(user.history)

    let history = user.history.split(" ")
    history.filter((histo) => { return histo != book })
    history.push(book)

    let result = ""
    history.map((item) => result += ` ${item}`)
    // user.history = result
    console.log(result)

    await User.update({ history: result }, {
        where: {
            id,
        },
    },);

    return res.status(200).json({ message: "berhasil update history" })
}

export const getUser = async (req, res) => {
    try {
        const response = await User.findAll()
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const profile = async (req, res) => {
    // req.params
    const { token } = req.params
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({
        where: {
            id
        }
    })
    return res.status(200).json(user)

}

export const getUserByID = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const createUser = async (req, res) => {
    const uniqueEmail = await User.findOne({ where: { email: req.body.email } })

    if (uniqueEmail) {
        return res.status(400).json({ email: "Email sudah di gunakan!" })
    }
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashPassword
        await User.create(req.body)
        console.log("UNINNININ")
        return res.status(200).json({ message: "User berhasil dibuat!" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

export const updateUser = async (req, res) => {

    try {
        if (req.body.password) {
            // const { nama, email, password } = req.body
            const salt = await bcrypt.genSalt();
            const password = req.body.password
            const hashPassword = await bcrypt.hash(password, salt)

            req.body.password = hashPassword

            const result = await User.update(req.body, { where: { id: req.params.id } })
            res.status(200).json({ message: "User Berhasil di update" })
        } else {

            const result = await User.update(req.body, { where: { id: req.params.id } })
            res.status(200).json({ message: "User Berhasil di update" })
        }
    } catch (e) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
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

