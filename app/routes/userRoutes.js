const router = require("express").Router();
const users = require("../controllers/userController");
const auth = require("../middleware/auth");
const {
	validationRulesSingup,
	validationRulesDataAcount,
	validationRulesChagePass,
} = require("../middleware/validationRules");

router.get("/login", users.getLoginForm);
router.post("/login", users.sendLoginForm);
router.get("/singup", users.getSingupForm);
router.post("/singup", validationRulesSingup, users.sendSingupForm);
router.get("/account", auth, users.getAccount);
router.post("/account", auth, validationRulesDataAcount, users.getEditAccount);
router.post("/accountPass", auth, validationRulesChagePass, users.getEditAccountPass);
router.get("/deleteAccount", auth, users.deleteAccount);
router.get("/logout", auth, users.logout);

module.exports = router;
