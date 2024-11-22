import Product from '@/models/product';
import dbConnect from '@/middleware/mongoose';

const getProducts = async (req, res) => {
	await dbConnect();
	const products = await Product.find();
	const allTShirts = await Product.find({ category: 't-shirt' });
	const allHoodies = await Product.find({ category: 'hoodie' });
	const allStickers = await Product.find({ category: 'sticker' });
	const allMugs = await Product.find({ category: 'mug' });

	const tShirts = {};
	const hoodies = {};
	const mugs = {};
	const stickers = {};

	allTShirts.forEach(item => {
		if (item.title in tShirts) {
			if (!tShirts[item.title].color.includes(item.color) && item.availQty) tShirts[item.title].color.push(item.color);
			if (!tShirts[item.title].size.includes(item.size) && item.availQty) tShirts[item.title].size.push(item.size);
		} else {
			tShirts[item.title] = JSON.parse(JSON.stringify(item));
			tShirts[item.title].color = [item.color];
			tShirts[item.title].size = [item.size];
			console.log(tShirts);
		}
	});
	allHoodies.forEach(item => {
		if (item.title in hoodies) {
			if (!hoodies[item.title].color.includes(item.color) && item.availQty) hoodies[item.title].color.push(item.color);
			if (!hoodies[item.title].size.includes(item.size) && item.availQty) hoodies[item.title].size.push(item.size);
		} else {
			hoodies[item.title] = JSON.parse(JSON.stringify(item));
			hoodies[item.title].color = [item.color];
			hoodies[item.title].size = [item.size];
			console.log(hoodies);
		}
	});
	allMugs.forEach(item => {
		if (item.title in mugs) {
			if (!mugs[item.title].color.includes(item.color) && item.availQty) mugs[item.title].color.push(item.color);
			if (!mugs[item.title].size.includes(item.size) && item.availQty) mugs[item.title].size.push(item.size);
		} else {
			mugs[item.title] = JSON.parse(JSON.stringify(item));
			mugs[item.title].color = [item.color];
			mugs[item.title].size = [item.size];
			console.log(mugs);
		}
	});
	allStickers.forEach(item => {
		if (item.title in stickers) {
			if (!stickers[item.title].color.includes(item.color) && item.availQty) stickers[item.title].color.push(item.color);
			if (!stickers[item.title].size.includes(item.size) && item.availQty) stickers[item.title].size.push(item.size);
		} else {
			stickers[item.title] = JSON.parse(JSON.stringify(item));
			stickers[item.title].color = [item.color];
			stickers[item.title].size = [item.size];
			console.log(stickers);
		}
	});

	res.status(200).json({ tShirts, hoodies, mugs, stickers });
};

export default getProducts;
