const express = require('express');
const multer = require("multer");
const routes = express.Router();

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadImage.middlewares");
const validate = require("../../validates/admin/products-category.validates");

const controllers = require("../../controllers/admin/products-category.controller");

routes.get("/", controllers.index);

routes.get("/create", controllers.create);

routes.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controllers.createPost
);

routes.get("/edit/:id", controllers.edit);

routes.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost, 
    controllers.editPatch
);

module.exports = routes;