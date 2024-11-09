const express = require('express')
const routes = express.Router();
const controllers = require("../../controllers/admin/role.controller");

routes.get("/", controllers.index);

routes.get("/create", controllers.create);

routes.post("/create", controllers.createPost);

routes.get("/edit/:id", controllers.edit);

routes.patch("/edit/:id", controllers.editPatch);

routes.get("/permissions", controllers.permissions);

routes.patch("/permissions", controllers.permissionsPatch);


module.exports = routes;