const fs = require("fs");
const path = require("path");
const Products = require("../models/productsModels");

function getProducts(req, res, next) {
	Products.find({}, (err, items) => {
		if (err) {
			res.render("info", {
				layout: "infoPage.hbs",
				link: "home",
				message: `Error:${err} , volver a la pagina principal`,
			});
		} else {
			res.render("controlProducts", { items, user: req.session.user.userName });
		}
	}).lean();
}

function addProducts(req, res, next) {
	let obj = {
		name: req.body.name,
		price: req.body.price,
		image: {
			data: fs.readFileSync(path.join("./public/uploads/" + req.file.filename)),
			contentType: "image/png",
		},
	};
	Products.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/products/listProducts");
		}
	});
}

function editProducts(req, res, next) {
	let obj;
	if (req.file !== undefined) {
		obj = {
			name: req.body.name,
			price: req.body.price,
			image: {
				data: fs.readFileSync(path.join("./public/uploads/" + req.file.filename)),
				contentType: "image/png",
			},
		};
	} else {
		obj = req.body;
	}

	Products.find({}, async (err, items) => {
		try {
			await Products.findByIdAndUpdate(items[req.body.position]._id, obj);
			res.redirect("/products/listProducts");
		} catch (err) {
			res.render("info", {
				layout: "infoPage.hbs",
				link: "products/listProducts",
				message: `Error:${err} , volver a la pagina anterior.`,
			});
		}
	}).lean();
}
function deleteProducts(req, res, next) {
	Products.find({}, async (err, items) => {
		try {
			await Products.findByIdAndDelete(items[req.body.position]._id);
			res.redirect("/products/listProducts");
		} catch (err) {
			res.render("info", {
				layout: "infoPage.hbs",
				link: "products/listProducts",
				message: `Error:${err} , volver a la pagina anterior.`,
			});
		}
	}).lean();
}
module.exports = {
	getProducts,
	addProducts,
	editProducts,
	deleteProducts,
};
