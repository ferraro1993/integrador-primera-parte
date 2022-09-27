const validator = require("express-validator");
const { body, validationResult } = validator;

const validationRulesSingup = [
	body("name")
		.notEmpty()
		.withMessage("*Campo obligatorio.")
		.isLength({ min: 2, max: 20 })
		.withMessage("*El nombre debe tener de 2 a 20 caracteres.")
		.trim(),
	body("lastName")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isLength({ min: 2, max: 20 })
		.withMessage("*El apellido debe tener de 2 a 20 caracteres")
		.trim(),
	body("dateOfBirth").notEmpty().withMessage("*Campo obligatorio.").trim(),
	body("email")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isEmail()
		.withMessage("*Debe ingresar un email válido")
		.trim(),
	body("phone")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isMobilePhone("es-AR")
		.withMessage("*fotmato invalido.ejem: +54911########")
		.trim(),
	body("address").notEmpty().withMessage("*campo obligatorio").trim(),
	body("user")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isLength({ min: 4, max: 20 })
		.withMessage("*El usuario debe tener de 2 a 20 caracteres")
		.trim(),
	body("pass")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isLength({ min: 6, max: 20 })
		.withMessage("*La contraseña debe tener de 6 a 20 caracteres"),
	body("confirmPass")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isLength({ min: 6, max: 20 })
		.withMessage("*El contraseña debe tener de 6 a 20 caracteres")
		.custom(async (confirmPass, { req }) => {
			if (req.body.pass !== confirmPass) {
				throw new Error("Las contraseñas no coinciden");
			}
			return true;
		})
		.withMessage("*Las contraseñas no coinciden"),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const formData = req.body;
			const arrWarnings = errors.array();
			res.render("singup", { arrWarnings, formData });
		} else return next();
	},
];
const validationRulesDataAcount = [
	body("name")
		.notEmpty()
		.withMessage("*Campo obligatorio.")
		.isLength({ min: 2, max: 20 })
		.withMessage("*El nombre debe tener de 2 a 20 caracteres.")
		.trim(),
	body("lastName")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isLength({ min: 2, max: 20 })
		.withMessage("*El apellido debe tener de 2 a 20 caracteres")
		.trim(),
	body("dateOfBirth").notEmpty().withMessage("*Campo obligatorio.").trim(),
	body("email")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isEmail()
		.withMessage("*Debe ingresar un email válido")
		.trim(),
	body("phone")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isMobilePhone("es-AR")
		.withMessage("*fotmato invalido.ejem: +54911########")
		.trim(),
	body("address").notEmpty().withMessage("*campo obligatorio").trim(),
	body("user")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isLength({ min: 4, max: 20 })
		.withMessage("*El usuario debe tener de 2 a 20 caracteres")
		.trim(),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const formData = req.body;
			const arrWarnings = errors.array();
			res.render("account", { user: req.session.user.userName, arrWarnings, formData });
		} else return next();
	},
];

const validationRulesChagePass = [
	body("oldPass").notEmpty().withMessage("*campo obligatorio"),
	body("password")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isLength({ min: 6, max: 20 })
		.withMessage("*La contraseña debe tener de 6 a 20 caracteres"),
	body("newConfirmPass")
		.notEmpty()
		.withMessage("*campo obligatorio")
		.isLength({ min: 6, max: 20 })
		.withMessage("*El contraseña debe tener de 6 a 20 caracteres")
		.custom(async (newConfirmPass, { req }) => {
			if (req.body.password !== newConfirmPass) {
				throw new Error("Las contraseñas no coinciden");
			}
			return true;
		})
		.withMessage("*Las contraseñas no coinciden"),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const formData = req.app.locals.lastInfoForm;
			const arrWarningsPass = errors.array();
			res.render("account", { user: req.session.user.userName, arrWarningsPass, formData });
		} else return next();
	},
];

module.exports = { validationRulesSingup, validationRulesDataAcount, validationRulesChagePass };
