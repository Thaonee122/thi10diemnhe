const express = require('express')
const routes = express.Router();
const controllers = require("../../controllers/client/products.controllers")

routes.get("/", controllers.index);

routes.get("/:slug", controllers.detail);

module.exports = routes;