import dbConnect from '@/middleware/mongoose';
import Product from '@/models/product';

const updateProducts = async (req, res) => {
	if (req.method === 'POST') {
		await dbConnect();
		const products = req.body;

		products.forEach(async (element, i, arr) => {
			await Product.findByIdAndUpdate(element._id, element);
		});
		res.status(200).json({ message: 'Products updated successfully' });
	} else {
		res.json(400).json({ status: 'This method is not allowed' });
	}
};

export default updateProducts;
