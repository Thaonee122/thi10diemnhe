const express = require('express')
const multer = require("multer");
const routes = express.Router();
// const storageMulter = require("../../helper/storage");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadImage.middlewares");
const validate = require("../../validates/admin/product.validates");
const controllers = require("../../controllers/admin/products.controller");

routes.get("/", controllers.index);

routes.patch("/change-status/:status/:id", controllers.changeStatus);

routes.patch("/change-multi", controllers.changeMulti);

routes.delete("/delete/:id", controllers.deleteItem);

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

routes.get("/detail/:id", controllers.detail);

module.exports = routes;