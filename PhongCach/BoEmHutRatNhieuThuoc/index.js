const express = require("express");
const path = require('path');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
require("dotenv").config();

const database = require("./config/database.js")

const route = require("./routes/client/index.routes.js");
const routeAdmin = require("./routes/admin/index.routes.js");

const systemConfig = require("./config/system.js");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));


//Flash
app.use(cookieParser("gdfgdfgd"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End flash

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//End TinyMCE

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

//App locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

//Routes
routeAdmin(app);
route(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})