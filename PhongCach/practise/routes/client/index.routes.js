const homeRoutes = require("./home.routes");
const productRoutes = require("./products.routes");

module.exports = (app) => {
    app.use('/', homeRoutes);
    app.use('/products', productRoutes);
}