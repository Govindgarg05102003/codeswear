import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
		category: { type: String, required: true },
		size: { type: String },
		color: { type: String },
		price: { type: Number, required: true },
		availQty: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
