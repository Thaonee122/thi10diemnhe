const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater")

mongoose.plugin(slug);

//Bộ khung
const productCategorySchema = new mongoose.Schema({
    title: String,
    parent_id:{
        type: String,
        default: "",
    },
    Description: String,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false,
    },
     // Sản phẩm đã xoá hay chưa
    deletedAt: Date
}, {
    timestamps: true,
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, "product-category"); //model để khởi tạo

module.exports = ProductCategory;