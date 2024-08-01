import Dongeng from '../Models/DongengModel.js';
import validator from 'validator';
import path from "path";
import fs from "fs";
import pdf from "pdf-poppler"

export const getDongeng = async (req, res) => {
    try {
        const response = await Dongeng.findAll();
        return res.status(200).json(response)
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}
export const getDongengById = async (req, res) => {
    try {
        const response = await Dongeng.findOne({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json(response)
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}

export const createDongeng = async (req, res) => {
    const { title } = req.body;
    const file = req.files.file

    const ext = path.extname(file.name)
    const fileNamed = new Date().toISOString().replace(/[-:.]/g, '')
    const fileName = fileNamed + ext;
    if (file === null) {
        return res.status(400).json({ message: "Tidak ada file yang di upload" })
    }

    const alowedTypes = [".pdf"]

    if (!alowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ message: "File Tidak Valid" })
    }

    file.mv(`./public/pdf/${fileName}`, async (err) => {
        if (err) {
            console.log("errooorrrr")
            return res.status(500).json({ message: err.message })
        }

        try {

            let file = `./public/pdf/${fileName}`;  // Ganti dengan path ke file PDF Anda

            let options = {
                format: 'png',      // Format output, bisa jpeg/png/tiff dll.
                out_dir: `./public/img`,  // Direktori output
                out_prefix: path.basename(file, path.extname(file)),  // Prefix nama file output
                page: 1              // Mengonversi hanya halaman pertama
            };

            pdf.convert(file, options)
                .then(() => {
                    console.log('Halaman pertama PDF berhasil dikonversi menjadi gambar.');
                })
                .catch(err => {
                    console.error(err);
                });

            await Dongeng.create({
                title,
                cover: `${req.protocol}://${req.get('host')}/img/${fileNamed}-01.png`,
                PdfPath: `${req.protocol}://${req.get('host')}/pdf/${fileName}`,
                fileName,
                view: 0,
            })
            return res.status(200).json({ message: "Berhasil" })
        } catch (err) {
            return res.json({ message: err.message })
        }
    })


}

export const updateDongeng = async (req, res) => {

    const item = await Dongeng.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!item) {
        return res.status(404).json({ message: "Dongeng tidak ditemukan" })
    }


    let result = {
        pdf: {
            value: null,
            message: null,
        },
        title: {
            value: req.body.title,
            message: (validator.isByteLength(req.body.title, { min: 4, max: 16 })) ? null : "Title Minimal berisi 4 karakter dan Maksimal 16 karakter",
        },
        status: (validator.isByteLength(req.body.title, { min: 4, max: 16 }))
    }

    const file = req.files.file
    console.log(file)
    let fileName = null
    if (file === null) {
        fileName = item.fileName
        await item.update({
            title: req.body.title,
        })
    } else {
        const ext = path.extname(file.name)
        fileName = file.md5 + ext;

        const alowedTypes = [".pdf"]
        if (!alowedTypes.includes(ext.toLowerCase())) {
            result.pdf.message = "File Tidak Valid"
            result.status = false
            return res.status(422).json(result)
        }

        if (file.length > 5000000) {
            result.pdf.message = "PDF harus kurang dari 5MB"
            result.status = false
            return res.status(422).json(result)
        }
        try {
            file.mv(`./public/pdf/${fileName}`, async (err) => {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                fs.unlinkSync(`./public/pdf/${item.fileName}`)
                await item.update({
                    title: req.body.title,
                    fileName,
                    PdfPath: `${req.protocol}://${req.get('host')}/pdf/${fileName}`,
                })

                res.status(200).json({ message: "Dongeng berhasil di perbarui!" })
            })

        } catch (err) {
            return res.json(500).json({ message: err.message })
        }
    }
}


export const deleteDongeng = async (req, res) => {
    const item = await Dongeng.findOne({
        where: {
            id: req.params.id
        }
    })
    // console.log(item);
    if (!item) return res.status(404).json({ message: "Dongeng tidak ditemukan!" })
    try {
        const filePath = item.PdfPath
        console.log(filePath);
        fs.unlinkSync(`./public/pdf/${item.fileName}`)
        await item.destroy({
            where: req.params.id
        })
        res.status(200).json({ message: "Dongeng berhasil dihapus!" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}