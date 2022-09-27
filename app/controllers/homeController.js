const Products = require("../models/productsModels");

function showBoards(req, res) {
	Products.find({}, (err, items) => {
		if (err) {
			res.render("info", {
				layout: "infoPage.hbs",
				link: "home",
				message: `Error:${err} , volver a la pagina principal`,
			});
		} else {
			if (req.session.user === undefined) {
				res.render("home", { items });
			} else {
				res.render("home", { items, user: req.session.user.userName });
			}
		}
	}).lean();
}

module.exports = {
	showBoards,
};
