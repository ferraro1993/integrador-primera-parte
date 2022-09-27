const router = require("express").Router();
const products = require("../controllers/productController");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.get("/listProducts", auth, products.getProducts);
router.post("/addProducts", auth, upload.single("image"), products.addProducts);
router.post("/editProducts", auth, upload.single("image"), products.editProducts);
router.post("/deleteProducts", auth, upload.single("image"), products.deleteProducts);
module.exports = router;
