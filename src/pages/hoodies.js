import dbConnect from '@/middleware/mongoose';
import Product from '@/models/product';
import Image from 'next/image';
import Link from 'next/link';

const Hoodies = ({ products }) => {
	return (
		<div>
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-24 mx-auto'>
					<div className='flex flex-wrap -m-4 justify-center'>
						{Object.keys(products).length === 0 && (
							<div className='font-bold text-3xl text-center'>
								Sorry All the hoodies are out of stock. <p> New hoodies are coming soon.</p>
								<p>Stay tooned.</p>
							</div>
						)}
						{Object.keys(products).map(item => (
							<div className='lg:w-1/4 md:w-[45%] p-4 w-full shadow-md m-2' key={products[item]._id}>
								<Link href={`/product/${products[item].slug}`} className='block relative rounded overflow-hidden'>
									<Image
										alt='ecommerce'
										className='object-cover object-top w-full h-[30vh] block'
										src={products[item].image}
										width={200}
										height={800}
									/>
									<div className='mt-4'>
										<h3 className='text-gray-800 text-xs tracking-widest title-font mb-1'>{products[item].category}</h3>
										<h2 className='text-gray-800 title-font text-lg font-medium'>{products[item].title}</h2>
										<p className='mt-1'>₹{products[item].price}</p>
										<p className='mt-1'>
											{products[item].size.map((sizes, i) => (
												<span key={i}>
													{i === 0 ? (
														<span className='border border-black px-1'>{sizes}</span>
													) : (
														<span className='border border-black border-l-0 px-1'>{sizes}</span>
													)}
												</span>
											))}
										</p>
										<p className='mt-1'>
											{products[item].color.includes('red') && (
												<button className='border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none'></button>
											)}
											{products[item].color.includes('blue') && (
												<button className='border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none'></button>
											)}
											{products[item].color.includes('yellow') && (
												<button className='border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none'></button>
											)}
											{products[item].color.includes('black') && (
												<button className='border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none'></button>
											)}
											{products[item].color.includes('green') && (
												<button className='border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none'></button>
											)}
											{products[item].color.includes('purple') && (
												<button className='border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none'></button>
											)}
										</p>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export async function getServerSideProps(context) {
	await dbConnect();
	let products = await Product.find();
	const allhoodies = await Product.find({ category: 'hoodies' });
	const hoodies = {};

	allhoodies.forEach(item => {
		if (item.title in hoodies) {
			if (!hoodies[item.title].color.includes(item.color) && item.availQty) hoodies[item.title].color.push(item.color);
			if (!hoodies[item.title].size.includes(item.size) && item.availQty) hoodies[item.title].size.push(item.size);
		} else {
			hoodies[item.title] = JSON.parse(JSON.stringify(item));
			hoodies[item.title].color = [item.color];
			hoodies[item.title].size = [item.size];
		}
	});
	console.log(hoodies);

	return {
		props: { products: JSON.parse(JSON.stringify(hoodies)) },
	};
}
export default Hoodies;
