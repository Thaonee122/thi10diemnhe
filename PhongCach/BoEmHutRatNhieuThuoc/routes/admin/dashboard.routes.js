const express = require('express')
const routes = express.Router();
const controllers = require("../../controllers/admin/dashboard.controller")

routes.get("/", controllers.dashboard);

module.exports = routes;