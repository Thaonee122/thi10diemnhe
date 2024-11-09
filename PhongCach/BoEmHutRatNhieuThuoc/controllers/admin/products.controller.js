const Product = require("../../models/product_model");
const filterStatusHelper = require("../../helper/filterStatus");
const systemConfig = require("../../config/system");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const createTreeHelper = require("../../helper/create-tree");
const ProductCategory = require("../../models/product-category.model");

//[GET] admin/products
module.exports.index = async (req, res) => {

    //Bộ lọc
    const filterStatus = filterStatusHelper(req.query);
    console.log(filterStatus);

    let find = {
        deleted: false
    };
    if(req.query.status){
        find.status = req.query.status;
    }
    //Tìm kiếm
    const objectSearch = searchHelper(req.query);
    console.log(objectSearch);

    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

// Pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currenPage: 1,
            limitItem: 4
        },
        req.query,
        countProducts
    );
// End Pagination

    //Sort
    let sort = {};
    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }
    //End sort
    // console.log(objectPagination.skip);
    const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);
    res.render("admin/pages/products/index.pug", {
        pageTitle: "List Products",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, { status: status });

    req.flash("info", "Cập nhật ok");
    
    res.redirect("back");
};

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, {status: "active" });
            req.flash("info", `Cập nhật ${ids.length} sản phẩm ok!`);   
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, {status: "inactive"});
            req.flash("info", `Cập nhật ${ids.length} sản phẩm ok!`);  
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deletedAt: new Date(),
            });
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);

                await Product.updateOne({ _id: id}, {
                    position: position
                });
            }
            break;
        default:
            break;
    }
    res.redirect("back");
};

//[PATCH] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    //Xoá cứng, xoá là pay màu luôn
    // await Product.deleteOne({ _id: id });

    //Xoá mềm
    await Product.updateOne({ _id: id }, { 
        deleted: true,
        deletedAt: new Date()
    });

    res.redirect("back");
};

//[GET] admin/products/create 
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };

    const category = await ProductCategory.find(find);

    const newCategory = createTreeHelper.tree(category);

    res.render("admin/pages/products/create.pug", {
        category: newCategory
    });
};

//[POST] admin/products/createPost
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position == ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts +1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(find);
    
        const category = await ProductCategory.find({
            deleted: false
        });
        const newCategory = createTreeHelper.tree(category);

        res.render("admin/pages/products/edit", {
            product: product,
            category: newCategory
        });
    } catch (error) {
        //req.flash("error", "Không tồn tại");
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};

// [PATCH] admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id =req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await Product.updateOne({ _id: id }, req.body);
        req.flash("info", "Update done!");
    } catch (error) {
        req.flash("error", "Update không được haha><");
    }

    res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [PATCH] admin/products/edit/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(find);

        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        //req.flash("error", "Không tồn tại");
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};