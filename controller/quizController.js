import Dongeng from "../Models/DongengModel.js";
import ForumQuiz from "../Models/forumQuizModel.js";
import RekapNilaiModel from "../Models/rekapNilai.js";
import SoalPilgan, {
  SoalUraianPanjang,
  SoalUraianSingkat,
} from "../Models/soalModel.js";
import { v4 as uuidv4 } from "uuid";

const generateRandomToken = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

export const getAllQuiz = async (req, res) => {
  try {
    const response = await ForumQuiz.findAll({
      include: {
        model: Dongeng,
        as: "dongeng",
        required: false,
        include: [
          {
            model: SoalPilgan,
            as: "soalPilgans",
            required: false,
          },
          {
            model: SoalUraianSingkat,
            as: "soalUraianSingkats",
            required: false,
          },
          {
            model: SoalUraianPanjang,
            as: "soalUraianPanjangs",
            required: false,
          },
        ],
      },
    });

    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { judul, idDongeng, sekolah, access_date, expired_date } = req.body;
    let token = generateRandomToken();
    await ForumQuiz.create({
      id: uuidv4(),
      judul,
      idDongeng,
      sekolah,
      access_date,
      expired_date,
      token,
    });
    res.status(201).json({ message: "Quiz Created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    await ForumQuiz.destroy({ where: { id: req.params.id } });
    await RekapNilaiModel.destroy({ where: { id_Forum: req.params.id } });
    res.status(200).json({ message: "Quiz Deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { judul, idDongeng, sekolah, access_date, expired_date } = req.body;
    const item = await ForumQuiz.findOne({ where: { id: req.params.id } });
    if (!item) {
      return res.status(404).json({ message: "Quiz Not Found" });
    }
    item.judul = judul;
    item.idDongeng = idDongeng;
    item.sekolah = sekolah;
    item.access_date = access_date;
    item.expired_date = expired_date;
    await item.save();
    res.status(200).json({ message: "Quiz Updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const response = await ForumQuiz.findOne({
      where: { id: req.params.id },
      include: {
        model: Dongeng,
        as: "dongeng",
        required: false,
        include: [
          {
            model: SoalPilgan,
            as: "soalPilgans",
            required: false,
          },
          {
            model: SoalUraianSingkat,
            as: "soalUraianSingkats",
            required: false,
          },
          {
            model: SoalUraianPanjang,
            as: "soalUraianPanjangs",
            required: false,
          },
        ],
      },
    });

    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
