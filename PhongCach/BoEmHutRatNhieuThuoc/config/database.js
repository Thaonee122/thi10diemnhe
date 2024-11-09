const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.Mongo_url);
        console.log("Kết nối ok");
    } catch (error) {
        console.log("Not connect");
    }
}