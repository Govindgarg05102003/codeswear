import dbConnect from '@/middleware/mongoose';
import Product from '@/models/product';

const addProducts = async (req, res) => {
	if (req.method === 'POST') {
		await dbConnect();

		const products = JSON.parse(JSON.stringify(req.body));
		try {
			for (const element of products) {
				await Product.create(element);
			}
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal server error');
		}

		res.status(200).json(products);
	} else {
		res.status(400).json('This method is not allowed');
	}
};

export default addProducts;
