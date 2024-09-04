import visited from "../Models/visitedModel.js";

export const newVisited = async (req, res) => {
    try {
        await visited.create()
        return res.status(200).json({ message: "new visited" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAllVisited = async (req, res) => {
    try {
        const count = (await visited.findAll()).length

        console.log(count)
        return res.status(200).json({
            visited: count
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}