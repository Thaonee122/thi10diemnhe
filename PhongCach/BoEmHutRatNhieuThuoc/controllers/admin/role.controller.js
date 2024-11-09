const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helper/filterStatus");

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await Role.find(find);
    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Nhóm quyền",
        records: records
    }
    );
}

//[GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Tạo nhóm quyền",
    });
};

//[POST] /admin/roles/createPost
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        let find = {
            _id: id,
            deleted: false
        };

        const data = await Role.findOne(find);

        res.render("admin/pages/roles/edit.pug", {
            pageTitle: "Sửa nhóm quyền",
            data: data
        });

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
};

//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;

        await Role.updateOne({ _id: id }, req.body);
        req.flash("success", "Cập nhật ok");

    } catch (error) {
        req.flash("error", "Cập nhật thất bại");
    }
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

//[Get] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await Role.find(find);
    res.render("admin/pages/roles/permissions.pug", {
        pageTitle: "Phân quyền nè",
        records: records
    });
};

//[Patch] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    const permissions = JSON.parse(req.body.permissions);

    for (const item of permissions) {
        await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
    }
    req.flash("success", "Cập nhật thành công");

    res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`);
};          