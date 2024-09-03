import ForumQuiz from "../Models/forumQuizModel.js";
import RekapNilaiModel from "../Models/rekapNilai.js";
import User from "../Models/UserModel.js";

export const getRekapByForumId = async (req, res) => {
  // console.log(req.params.id_forum);
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
