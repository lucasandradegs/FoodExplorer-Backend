const { Router } = require("express")

const multer = require("multer")
const uploadConfig = require("../configs/upload")

const PlatesController = require("../controller/PlatesController")
const PlateImageController = require("../controller/PlateImageController")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const platesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const platesController = new PlatesController();
const plateImageController = new PlateImageController();


platesRoutes.use(ensureAuthenticated)


platesRoutes.post("/", upload.single("image"), platesController.create)
platesRoutes.put("/:id", verifyUserAuthorization("admin"), platesController.update)
platesRoutes.get("/:id", platesController.show)
platesRoutes.delete("/:id", verifyUserAuthorization("admin"), platesController.delete)
platesRoutes.get("/", platesController.index)
platesRoutes.patch("/:id", upload.single("image"), plateImageController.update)

module.exports = platesRoutes;