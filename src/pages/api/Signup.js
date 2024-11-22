import dbConnect from '@/middleware/mongoose';
import User from '@/models/user';
import CryptoJS from 'crypto-js';

const Signup = async (req, res) => {
	if (req.method === 'POST') {
		await dbConnect();
		const { name, email, password } = req.body;
		console.log(name, email, password);

		try {
			let createUser = await User.create({
				name,
				email,
				password: CryptoJS.AES.encrypt(password, 'secret key 123').toString(),
			});
			console.log(createUser);
			res.status(200).json({ success: true });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false });
		}
	} else {
		res.status(400).json({ success: false, message: `${req.method} method is not allowed` });
	}
};

export default Signup;
