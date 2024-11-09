const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater")

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id: {
        type: String,
        default: ""
    },
    Description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number, //Số lượng còn lại
    thumbnail: String,//Hình ảnh
    status: String,//Trạng thái của sp còn hoạt động hoặc ko
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
     // Sản phẩm đã xoá hay chưa
    deletedAt: Date
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema, "product"); //model để khởi tạo

module.exports = Product;