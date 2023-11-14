const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")
const AppError = require("../utils/AppError");

class PlateImageController {
    async update(req, res) {
        const { id } = req.params

        const plateFilename = req.file.filename;

        const diskStorage = new DiskStorage();
        const plate = await knex("plates").where({ id }).first()

        if(!plate) {
            throw new AppError("Prato não encontrado no sistema")
        }

        if(plate.image) {
            await diskStorage.deleteFile(plate.image)
        }

        const filename = await diskStorage.saveFile(plateFilename)
        plate.image = filename

        await knex("plates").update(plate).where({ id })

        return res.status(201).json(plate)
    }
}

module.exports = PlateImageController