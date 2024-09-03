import Dongeng from "../Models/DongengModel.js";
import validator from "validator";
import path from "path";
import fs from "fs";
import pdf from "pdf-poppler";

export const getDongeng = async (req, res) => {
  try {
    const response = await Dongeng.findAll();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export const countDongeng = async (req, res) => {


    try {
        const response = (await (Dongeng.findAll())).length;
        return res.status(200).json({ row: response })
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}

export const countAllView = async (req, res) => {
    try {
        const views = await Dongeng.findAll({ attributes: ['view'] });
        let viewAll = 0
        views.map((view) => {
            // console.log(view.view)
            viewAll += view.view
        })
        return res.status(200).json({ views: viewAll })
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}

export const popularView = async (req, res) => {
  try {
    const result = await Dongeng.findAll({
      limit: 4,
      order: [["view", "DESC"]],
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const sumView = async (req, res) => {
  const { id } = req.params;
  try {
    const raw = await Dongeng.findOne({
      where: { id },
    });

    raw.update({ view: raw.view + 1 });
    return res.status(200).json({ message: "Berhasil menambah view" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getDongengById = async (req, res) => {
  try {
    const response = await Dongeng.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export const createDongeng = async (req, res) => {
  const { title } = req.body;
  const file = req.files.file;

  console.log(file);
  const ext = path.extname(file.name);
  const fileNamed = new Date().toISOString().replace(/[-:.]/g, "");
  const fileName = fileNamed + ext;
  if (file === null) {
    return res.status(400).json({ message: "Tidak ada file yang di upload" });
  }

  const alowedTypes = [".pdf"];

  if (!alowedTypes.includes(ext.toLowerCase())) {
    return res.status(422).json({ message: "File Tidak Valid" });
  }

  file.mv(`./public/pdf/${fileName}`, async (err) => {
    if (err) {
      console.log("errooorrrr");
      return res.status(500).json({ message: err.message });
    }
    // console.log(path.basename(file, path.extname(file)))

    try {
      let file = `./public/pdf/${fileName}`; // Ganti dengan path ke file PDF Anda
      const outputDir = "./public/img";

      let options = {
        format: "png", // Format output, bisa jpeg/png/tiff dll.
        out_dir: outputDir, // Direktori output
        out_prefix: fileNamed, // Prefix nama file output
        page: 1, // Mengonversi hanya halaman pertama
      };

      pdf
        .convert(file, options)
        .then(() => {
          const tempOutputFile1 = path.join(outputDir, `${fileNamed}-1.png`);
          const tempOutputFile01 = path.join(outputDir, `${fileNamed}-01.png`);
          const finalOutputFile = path.join(outputDir, `${fileNamed}.png`);

          // Memeriksa apakah file sementara ada
          if (fs.existsSync(tempOutputFile1)) {
            // Mengganti nama file ke nama yang diinginkan tanpa nomor halaman
            fs.rename(tempOutputFile1, finalOutputFile, (err) => {
              if (err) throw err;
              console.log(
                `File berhasil diubah namanya menjadi ${fileNamed}.png`
              );
            });
          } else if (fs.existsSync(tempOutputFile01)) {
            // Mengganti nama file ke nama yang diinginkan tanpa nomor halaman
            fs.rename(tempOutputFile01, finalOutputFile, (err) => {
              if (err) throw err;
              console.log(
                `File berhasil diubah namanya menjadi ${fileNamed}.png`
              );
            });
          } else {
            console.error("File sementara tidak ditemukan!");
          }
        })
        .catch((err) => {
          console.error(err);
        });

      try {
        await Dongeng.create({
          title,
          cover: `${req.protocol}://${req.get("host")}/img/${fileNamed}.png`,
          PdfPath: `${req.protocol}://${req.get("host")}/pdf/${fileName}`,
          fileName,
          view: 0,
        });
      } catch (error) {
        console.log(error);
      }
      return res.status(200).json({ message: "Berhasil" });
    } catch (err) {
      return res.json({ message: err.message });
    }
  });
};

export const updateDongeng = async (req, res) => {
  const item = await Dongeng.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!item) {
    return res.status(404).json({ message: "Dongeng tidak ditemukan" });
  }

  let fileName = null;
  if (!req.files) {
    fileName = item.fileName;
    await item.update({
      title: req.body.title,
    });
    res.status(200).json({ message: "Dongeng Berhasil diperbarui" });
  } else {
    const file = req.files.file;
    const ext = path.extname(file.name);
    const fileNamed = new Date().toISOString().replace(/[-:.]/g, "");
    fileName = fileNamed + ext;

    const alowedTypes = [".pdf"];
    if (!alowedTypes.includes(ext.toLowerCase())) {
      return res.status(422).json({ message: "Invalid extension file" });
    }

    try {
      file.mv(`./public/pdf/${fileName}`, async (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        let file = `./public/pdf/${fileName}`; // Ganti dengan path ke file PDF Anda
        const outputDir = "./public/img";

        let options = {
          format: "png", // Format output, bisa jpeg/png/tiff dll.
          out_dir: outputDir, // Direktori output
          out_prefix: fileNamed, // Prefix nama file output
          page: 1, // Mengonversi hanya halaman pertama
        };

        pdf
          .convert(file, options)
          .then(() => {
            const tempOutputFile1 = path.join(outputDir, `${fileNamed}-01.png`);
            const tempOutputFile01 = path.join(outputDir, `${fileNamed}-1.png`);
            const finalOutputFile = path.join(outputDir, `${fileNamed}.png`);

            // Memeriksa apakah file sementara ada
            if (fs.existsSync(tempOutputFile1)) {
              // Mengganti nama file ke nama yang diinginkan tanpa nomor halaman
              fs.rename(tempOutputFile1, finalOutputFile, (err) => {
                if (err) throw err;
                console.log(
                  `File berhasil diubah namanya menjadi ${fileNamed}.png`
                );
              });
            } else if (fs.existsSync(tempOutputFile01)) {
              // Mengganti nama file ke nama yang diinginkan tanpa nomor halaman
              fs.rename(tempOutputFile01, finalOutputFile, (err) => {
                if (err) throw err;
                console.log(
                  `File berhasil diubah namanya menjadi ${fileNamed}.png`
                );
              });
            } else {
              console.error("File sementara tidak ditemukan!");
            }
          })
          .catch((err) => {
            console.error(err);
          });
        fs.unlinkSync(`./public/pdf/${item.fileName}`);
        fs.unlinkSync(`./public/img/${item.fileName.split(".")[0]}.png`);

        await item.update({
          title: req.body.title,
          cover: `${req.protocol}://${req.get("host")}/img/${fileNamed}.png`,
          fileName,
          PdfPath: `${req.protocol}://${req.get("host")}/pdf/${fileName}`,
        });

        res.status(200).json({ message: "Dongeng berhasil di perbarui!" });
      });
    } catch (err) {
      return res.json(500).json({ message: err.message });
    }
  }
};

export const deleteDongeng = async (req, res) => {
  const item = await Dongeng.findOne({
    where: {
      id: req.params.id,
    },
  });
  // console.log(item);
  if (!item)
    return res.status(404).json({ message: "Dongeng tidak ditemukan!" });
  try {
    const filePath = item.PdfPath;
    console.log(filePath);
    fs.unlinkSync(`./public/pdf/${item.fileName}`);
    fs.unlinkSync(`./public/img/${item.fileName.split(".")[0]}.png`);
    await item.destroy({
      where: req.params.id,
    });
    res.status(200).json({ message: "Dongeng berhasil dihapus!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
