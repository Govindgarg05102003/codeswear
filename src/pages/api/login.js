import dbConnect from '@/middleware/mongoose';
import User from '@/models/user';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const addProducts = async (req, res) => {
	if (req.method === 'POST') {
		await dbConnect();
		try {
			const user = await User.findOne({ email: req.body.email });
			if (user) {
				if (req.body.password === CryptoJS.AES.decrypt(user.password, 'secret key 123').toString(CryptoJS.enc.Utf8)) {
					const token = jwt.sign({ user }, 'jwtsecret');
					return res.status(200).json({ success: true, token });
				} else {
					return res.status(200).json({ success: false, message: 'Invalid Credentials' });
				}
			} else {
				return res.status(200).json({ success: false, message: 'Invalid Credentials' });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Something went wrong' });
		}
	} else {
		res.status(400).json({ success: false, message: `${req.method} method is not allowed` });
	}
};

export default addProducts;
