const auth = (req, res, next) => {
	if (req.session.user) {
		next();
	} else {
		res.render("info", {
			layout: "infoPage.hbs",
			link: "users/login",
			message: "Inicia sesión para acceder este contenido",
		});
	}
};

module.exports = auth;
