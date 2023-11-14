const { Router } = require("express")
const IngredientsController = require("../controller/IngredientsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const ingredientsController = new IngredientsController();
const ingredientsRoutes = Router()

ingredientsRoutes.use(verifyUserAuthorization("admin"))

ingredientsRoutes.get("/", ensureAuthenticated, ingredientsController.index)

module.exports = ingredientsRoutes;