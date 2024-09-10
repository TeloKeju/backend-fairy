import Dongeng from "../Models/DongengModel.js";
import ForumQuiz from "../Models/forumQuizModel.js";
import RekapNilaiModel from "../Models/rekapNilai.js";
import User from "../Models/UserModel.js";
import { v4 as uuidv4 } from "uuid";

const date = new Date();

export const getRekapByForumId = async (req, res) => {
  try {
    const result = await RekapNilaiModel.findAll({
      include: [
        {
          model: User,
          as: "user",
          required: true,
        },
        {
          model: ForumQuiz,
          as: "forumQuiz",
          required: true,
        },
      ],
      where: {
        id_Forum: req.params.id_forum,
      },
      order: [[User, "nama", "ASC"]],
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const joinForumByToken = async (req, res) => {
  try {
    const result = await ForumQuiz.findOne({
      where: {
        token: req.body.token,
      },
    });

    if (!result) {
      return res.status(400).json({ message: "Invalid token" });
    } else if (result.id_User == req.body.id_user) {
      return res.status(400).json({ message: "Already joined" });
    } else if (new Date(result.expired_date) < date) {
      return res.status(400).json({ message: "Token expired" });
    } else if (new Date(result.access_date) > date) {
      return res.status(400).json({ message: "Token not yet available" });
    }

    const checkJoinedStatus = await RekapNilaiModel.findOne({
      where: {
        id_User: req.body.id_user,
        id_Forum: result.id,
      },
    });
    if (checkJoinedStatus) {
      return res.status(400).json({ message: "Already joined" });
    }

    await RekapNilaiModel.create({
      id: uuidv4(),
      id_Forum: result.id,
      id_User: req.body.id_user,
      nilai: 0,
    });

    return res
      .status(200)
      .json({ message: "Success join forum", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateNilaiQuiz = async (req, res) => {
  try {
    const result = await RekapNilaiModel.findOne({
      where: {
        id: req.body.id,
      },
    });
    result.nilai = req.body.nilai;
    await result.save();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getQuizByUserId = async (req, res) => {
  try {
    const result = await RekapNilaiModel.findAll({
      include: [
        {
          model: User,
          as: "user",
          required: true,
        },
        {
          model: ForumQuiz,
          as: "forumQuiz",
          required: true,
          include: [
            {
              model: Dongeng,
              as: "dongeng",
              required: true,
            },
          ],
        },
      ],
      where: {
        id_User: req.params.id_user,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getRekapById = async (req, res) => {
  try {
    const result = await RekapNilaiModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
