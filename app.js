"use strict";
// Se importan los módulos necesarios
const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const userRoutes = require("./app/routes/userRoutes");
const productRoutes = require("./app/routes/productRoutes");
const homeRoutes = require("./app/routes/homeRoutes");
const dotenv = require("dotenv");
const auth = require("./app/middleware/auth");
const { log } = require("console");
require("./config/mongo");

//configuro dotenv
dotenv.config();

//Puerto de escucha del server
const PORT = process.env.PORT || 3000;

//Creo la aplicación "express"
const app = express();

app.locals.lastInfoForm = "";

/*--------------------------------------------Express-Handlebars config----------------------------------------*/
//Configuro el motor de visualización
app.engine(
	"hbs",
	hbs.engine({ helpers: require("./app/helpers/customHelpers.js").helpers, extname: ".hbs" })
);
//app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));
/*-------------------------------------------------------------------------------------------------------------*/

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

//Cargo todos los archivos  estaticos de la carpeta “public”
app.use(express.static(path.join(__dirname, "public")));

//Habilitamos la lectura de datos del body de la request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", homeRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.get("/producto", function (req, res) {
	res.render("producto");
});

app.get("/cart", auth, (req, res) => {
	if (req.session.user === undefined) {
		res.render("cart");
	} else {
		res.render("cart", { user: req.session.user.userName });
	}
});

app.get("*", (req, res) => {
	res.render("info", {
		layout: "infoPage.hbs",
		message: "Error:404 Pagina no encontrada. Volver a la pagina principal.",
	});
});

app.listen(PORT, (err) => {
	err ? console.log(`Error:${err.code}`) : console.log(`app running on http://localhost:${PORT}`);
});
