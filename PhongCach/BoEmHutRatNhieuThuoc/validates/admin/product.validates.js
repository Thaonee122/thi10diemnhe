module.exports.createPost = (req, res, next) =>{
    if(!req.body.title){
        req.flash("error", `Nhập tiêu đề vào cu!`);
        res.redirect("back");
        return;
    }
    next();
}