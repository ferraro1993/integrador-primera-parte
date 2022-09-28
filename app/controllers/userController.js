const securePass = require("../helpers/securePass");
const User = require("../models/usersModels");

//renderiza o muestra el formulario de login
function getLoginForm(req, res, next) {
	res.render("login");
}

//procesa form de login
async function sendLoginForm(req, res, next) {
	//obtengo el user y el pass del formulario
	const { user, pass } = req.body;
	//obtengo la información de la base de datos del usuario especificado
	const userData = await User.find().where({ user });

	//Verifico si el usuario es correcto
	if (!userData.length) {
		return res.render("login", { message: "*Usuario o contraseña incorectos" });
	}
	//Verifico si la contraseña es correcta
	if (await securePass.decrypt(pass, userData[0].password)) {
		req.session.user = {
			id: userData[0]._id,
			userName: userData[0].user,
		};

		res.redirect("/");
	} else return res.render("login", { message: "*Usuario o contraseña incorectos" });
}

//renderiza o muestra el formulario de registro
function getSingupForm(req, res, next) {
	res.render("singup");
}

//registra un nuevo usuario en la base de datos
async function sendSingupForm(req, res, next) {
	const { name, lastName, dateOfBirth, email, phone, address, user, pass } = req.body;
	const password = await securePass.encrypt(pass);
	const newUser = new User({
		name,
		lastName,
		dateOfBirth,
		email,
		phone,
		address,
		user,
		password,
	});
	newUser.save((err) => {
		if (!err) {
			res.render("info", {
				layout: "infoPage.hbs",
				link: "users/login",
				message: "Su cuenta a sido creada exitosamente, ir a la página de inicio sesión.",
			});
		} else {
			if ((err.codeName = "DuplicateKey")) {
				let obj = [
					{ param: "user", msg: "*Este usuario ya se encuentra registrado, intente con otro" },
				];
				const formData = req.body;
				res.render("singup", { arrWarnings: obj, formData });
			} else {
				res.render("info", {
					layout: "infoPage.hbs",
					link: "users/account",
					message: `Error: ${err.codeName}, volver a la página cuenta.`,
				});
			}
		}
	});
}
/*Muestra la información de un usuario de la base de datos*/
async function getAccount(req, res, next) {
	//Busca la información usado el ID del usuario
	const user = await User.findById(req.session.user.id).lean();
	req.app.locals.lastInfoForm = user;
	//Renderiza la página y carga la información del usuario
	res.render("account", { user: req.session.user.userName, formData: user });
}

/*Edita cualquier información de la base de datos (menos la contraseña)*/
async function getEditAccount(req, res, next) {
	try {
		await User.findByIdAndUpdate(req.session.user.id, req.body);
		res.render("info", {
			layout: "infoPage.hbs",
			link: "users/account",
			message: "Los cambios se aplicaron correctamente, volver a la página cuenta.",
		});
	} catch (err) {
		if ((err.codeName = "DuplicateKey")) {
			let obj = [
				{ param: "user", msg: "*Este usuario ya se encuentra registrado, intente con otro" },
			];
			const formData = req.body;
			res.render("account", { user: req.session.user.userName, arrWarnings: obj, formData });
		} else {
			res.render("info", {
				layout: "infoPage.hbs",
				link: "users/account",
				message: `Error: ${err.codeName}, volver a la página cuenta.`,
			});
		}
	}
}

/*Cambia la contraseña de base de datos */
async function getEditAccountPass(req, res, next) {
	//obtengo  la contraseña original del formulario
	const { oldPass } = req.body;
	//obtengo el uruario
	const user = req.session.user.userName;
	//obtengo la información de la base de datos del ID especificado
	const userData = await User.findById(req.session.user.id).lean();
	//Verifico si la contraseña es correcta
	//(si coincide con la que esta guardada en la base de datos  )
	if (await securePass.decrypt(oldPass, userData.password)) {
		try {
			//Encripto la nueva contraseña
			const encyptPass = await securePass.encrypt(req.body.password);
			//Cambio la contraseña en la base de datos
			await User.findByIdAndUpdate(req.session.user.id, { password: encyptPass });
			// destruyo la sesión
			req.session.destroy();
			res.render("info", {
				layout: "infoPage.hbs",
				link: "users/login",
				message:
					"La contraseña se cambio correctamente, ir a iniciar sesión con la contraseña nueva. ",
			});
		} catch (err) {
			res.render("info", {
				layout: "infoPage.hbs",
				link: "users/account",
				message: `Error: ${err.codeName}, volver a la página cuenta.`,
			});
		}
	} else {
		//Si la contraseña no es correcta lo informo
		let obj = [{ param: "oldPass", msg: "*La contraseña anterior no es correcta" }];
		res.render("account", { user, arrWarningsPass: obj, formData: userData });
	}
}

//Hace logout ( destruye la sesión)
function logout(req, res, next) {
	req.session.destroy();
	res.redirect("/");
}

async function deleteAccount(req, res, next) {
	try {
		await User.findByIdAndDelete(req.session.user.id);
		req.session.destroy();
		res.render("info", {
			layout: "infoPage.hbs",
			link: "../",
			message: "La cuenta se ha borrado, ir a la página principal.",
		});
	} catch (err) {
		res.render("info", {
			layout: "infoPage.hbs",
			link: "users/account",
			message: `Error: ${err.codeName}, volver a la página cuenta.`,
		});
	}
}
module.exports = {
	getLoginForm,
	sendLoginForm,
	getSingupForm,
	sendSingupForm,
	getAccount,
	getEditAccount,
	getEditAccountPass,
	logout,
	deleteAccount,
};
