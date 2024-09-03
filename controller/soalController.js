import { where } from "sequelize";
import Dongeng from "../Models/DongengModel.js";
import SoalPilgan, {
  SoalUraianPanjang,
  SoalUraianSingkat,
} from "../Models/soalModel.js";
import { v4 as uuidv4 } from "uuid";

// Pilihan Ganda
export const getSoalPilgan = async (req, res) => {
  try {
    const response = await SoalPilgan.findAll({
      include: {
        model: Dongeng,
        as: "dongeng", // Optional alias
        required: false, // This ensures a LEFT OUTER JOIN
      },
    });
    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createSoalPilgan = async (req, res) => {
  try {
    const { soal, idDongeng, opsi_1, opsi_2, opsi_3, opsi_4, jawaban } =
      req.body;
    await SoalPilgan.create({
      id: uuidv4(),
      soal,
      idDongeng,
      opsi_1,
      opsi_2,
      opsi_3,
      opsi_4,
      jawaban,
    });
    res.status(201).json({ message: "Soal Pilihan Ganda Created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteSoalPilgan = async (req, res) => {
  try {
    await SoalPilgan.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Soal Pilihan Ganda Deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateSoalPilgan = async (req, res) => {
  try {
    const { soal, idDongeng, opsi_1, opsi_2, opsi_3, opsi_4, jawaban } =
      req.body;
    const item = await SoalPilgan.findOne({ where: { id: req.params.id } });
    if (!item) {
      return res.status(404).json({ message: "Soal Pilihan Ganda Not Found" });
    }
    item.soal = soal;
    item.idDongeng = idDongeng;
    item.opsi_1 = opsi_1;
    item.opsi_2 = opsi_2;
    item.opsi_3 = opsi_3;
    item.opsi_4 = opsi_4;
    item.jawaban = jawaban;
    await item.save();
    res.status(200).json({ message: "Soal Pilihan Ganda Updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Uraian Panjang
export const getSoalUraianPanjang = async (req, res) => {
  try {
    const response = await SoalUraianPanjang.findAll({
      include: {
        model: Dongeng,
        as: "dongeng",
        required: false,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createSoalUraianPanjang = async (req, res) => {
  try {
    const { soal, idDongeng, jawaban } = req.body;
    await SoalUraianPanjang.create({
      id: uuidv4(),
      soal,
      idDongeng,
      jawaban,
    });
    res.status(201).json({ message: "Soal Uraian Panjang Created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteSoalUraianPanjang = async (req, res) => {
  try {
    await SoalUraianPanjang.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Soal Uraian Panjang Deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateSoalUraianPanjang = async (req, res) => {
  try {
    const { soal, idDongeng, jawaban } = req.body;
    const item = await SoalUraianPanjang.findOne({
      where: { id: req.params.id },
    });
    if (!item) {
      return res.status(404).json({ message: "Soal Uraian Panjang Not Found" });
    }
    item.soal = soal;
    item.idDongeng = idDongeng;
    item.jawaban = jawaban;
    await item.save();
    res.status(200).json({ message: "Soal Uraian Panjang Updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Uraian Singkat
export const getSoalUraianSingkat = async (req, res) => {
  try {
    const response = await SoalUraianSingkat.findAll({
      include: {
        model: Dongeng,
        as: "dongeng",
        required: false,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createSoalUraianSingkat = async (req, res) => {
  try {
    const { soal, idDongeng, jawaban } = req.body;
    await SoalUraianSingkat.create({
      id: uuidv4(),
      soal,
      idDongeng,
      jawaban,
    });
    res.status(201).json({ message: "Soal Uraian Singkat Created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteSoalUraianSingkat = async (req, res) => {
  try {
    await SoalUraianSingkat.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Soal Uraian Singkat Deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateSoalUraianSingkat = async (req, res) => {
  try {
    const { soal, idDongeng, jawaban } = req.body;
    const item = await SoalUraianSingkat.findOne({
      where: { id: req.params.id },
    });
    if (!item) {
      return res.status(404).json({ message: "Soal Uraian Singkat Not Found" });
    }
    item.soal = soal;
    item.idDongeng = idDongeng;
    item.jawaban = jawaban;
    await item.save();
    res.status(200).json({ message: "Soal Uraian Singkat Updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
