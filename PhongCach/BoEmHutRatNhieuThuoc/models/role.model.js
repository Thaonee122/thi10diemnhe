const mongoose = require("mongoose");

//Bộ khung
const roleSchema = new mongoose.Schema({
    title: String,
    Description: String,
    permissions: {
        type: Array,
        default: []
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

const Role = mongoose.model('Role', roleSchema, "roles"); //model để khởi tạo

module.exports = Role;