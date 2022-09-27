const { Schema, model } = require("mongoose");
const productSchema = new Schema(
	{
		name: { type: String, require: true },
		price: { type: String, require: true },
		image: {
			data: Buffer,
			contentType: String,
		},
	},
	{ timestamps: true }
);

const Product = model("Product", productSchema);
module.exports = Product;
