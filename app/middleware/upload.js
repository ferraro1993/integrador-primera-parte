const multer = require("multer");

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now());
	},
});

let upload = multer({ storage: storage });
module.exports = upload;
