import dbConnect from '@/middleware/mongoose';
import Product from '@/models/product';

const dbfind = async (req, res) => {
	let findedProduct;
	if (req.method === 'POST') {
		await dbConnect();
		const findBody = req.body;
		console.log('findBody', findBody);
		findedProduct = await Product.find(findBody);
	} else {
		findedProduct = [];
	}
	res.status(200).json(findedProduct);
};

export default dbfind;
