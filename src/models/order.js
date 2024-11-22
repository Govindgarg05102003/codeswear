import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		products: [
			{
				productId: { type: String },
				quantity: { type: Number, default: 1 },
			},
		],
		address: { type: String, required: true },
		amount: { type: Number, required: true },
		status: { type: String, default: 'Pending', required: true },
	},
	{ timestamps: true }
);

const orders = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default orders;
