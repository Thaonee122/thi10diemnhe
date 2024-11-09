const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.routes");
const productRoutes = require("./products.routes");
const productRoutesCategory = require("./products-category.routes");
const roleRoutes = require("./role.routes");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);

    app.use(PATH_ADMIN + "/products", productRoutes);
    
    app.use(PATH_ADMIN + "/products-category", productRoutesCategory);

    app.use(PATH_ADMIN + "/roles", roleRoutes);
}