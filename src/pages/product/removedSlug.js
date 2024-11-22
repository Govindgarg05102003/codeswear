import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import dbConnect from '@/middleware/mongoose';
import Product from '@/models/product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = ({ buyNow, addToCart, product, varients }) => {
	const pincode = useRef();
	const [isServicable, setIsServicable] = useState(null);
	const router = useRouter();
	const slug = router.query.slug;
	const [pin, setPin] = useState();

	const checkServiceability = async () => {
		// let pins = await axios.get(`${process.env.HOST}/api/pincode`);
		let pins = await axios.get(`/api/pincode`);
		let pinJson = await pins.data;
		if (pinJson.includes(parseInt(pin))) {
			toast.success('Your pincode is servicable!', {
				position: 'top-center',
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
			setIsServicable(true);
		} else {
			setIsServicable(false);
			toast.error('Sorry, Pincode not servicable!', {
				position: 'top-center',
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
		}
	};
	const onChangePin = e => {
		setPin(e.target.value);
	};

	const [allColors, setAllColors] = useState(Object.keys(varients));
	const [Color, setColor] = useState(product.color); // color of the clicked product
	const [Size, setSize] = useState(product.size); //Size of the clicked Product.On initial render we are setting this to the first size of the clicked color present in the varient/colorSizeslug. But when the user selects the color (after the initial render) we are setting this to the clicked color.(if no color is cliked then first size of the cliked color present in the varient/colorSizeSlug).
	// console.log(Size);

	const [allSize, setAllSize] = useState(Object.keys(varients[Color]));

	//console.log(allColors);
	//console.log(varients);

	//console.log('from size ', allSize);
	const colorBtn = useRef();
	const sizeOption = useRef();

	const pageRefresh = async (color, size) => {
		console.log('color', color, 'size', size);
		console.log('titleeeeeeee', product.title);
		console.log(product.category);

		// const response = await axios.post(`${process.env.HOST}/api/dbfind`, {
		const response = await axios.post(`/api/dbfind`, {
			category: product.category,
			title: product.title,
			color: color,
			size: size,
		});

		let clickedProductSlug = response.data;
		console.log(clickedProductSlug);

		if (clickedProductSlug.length === 0) {
			console.log('first');

			// const response = await axios.post(`${process.env.HOST}/api/dbfind`, {
			const response = await axios.post(`/api/dbfind`, {
				category: 't-shirt',
				color: color,
			});
			// console.log(response.data);
			clickedProductSlug = response.data;
			window.location.href = `${clickedProductSlug[0].slug}`;
		} else {
			window.location.href = `${clickedProductSlug[0].slug}?size=${size}`;
		}
	};

	return (
		<div>
			<ToastContainer
				position='top-center'
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
			<section className='text-gray-600 body-font overflow-hidden'>
				<div className='container px-5 py-16 mx-auto'>
					<div className='lg:w-4/5 mx-auto flex flex-wrap'>
						<Image
							alt='ecommerce'
							className='lg:w-2/2 w-full lg:h-auto h-64 object-cover object-center rounded'
							src={product.image}
							width={400}
							height={400}
							style={{ width: 'auto', height: 'auto' }}
						/>
						<div className='lg:w-2/2 md:w-full lg:w-[50%] lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
							<h2 className='text-sm title-font text-gray-500 tracking-widest'>CODESWEAR</h2>
							<h1 className='text-gray-900 text-3xl title-font font-medium mb-2'>
								{product.title} ({Size}/{Color})
							</h1>
							<div className='flex mb-4'>
								<span className='flex items-center'>
									<svg
										fill='currentColor'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 text-pink-500'
										viewBox='0 0 24 24'>
										<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 2.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-2.01L12 2z' />
									</svg>
									<svg
										fill='currentColor'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 text-pink-500'
										viewBox='0 0 24 24'>
										<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 2.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-2.01L12 2z' />
									</svg>
									<svg
										fill='currentColor'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 text-pink-500'
										viewBox='0 0 24 24'>
										<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 2.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-2.01L12 2z' />
									</svg>
									<svg
										fill='currentColor'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 text-pink-500'
										viewBox='0 0 24 24'>
										<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 2.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-2.01L12 2z' />
									</svg>
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 text-pink-500'
										viewBox='0 0 24 24'>
										<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 2.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-2.01L12 2z' />
									</svg>
									<span className='text-gray-600 ml-3'>4 Reviews</span>
								</span>
								<span className='flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s'>
									<a className='text-gray-500'>
										<svg
											fill='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											className='w-5 h-5'
											viewBox='0 0 24 24'>
											<path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 2 0 011-1h3z' />
										</svg>
									</a>
									<a className='text-gray-500'>
										<svg
											fill='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											className='w-5 h-5'
											viewBox='0 0 24 24'>
											<path d='M23 3a10.9 10.9 0 01-3.14 2.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' />
										</svg>
									</a>
									<a className='text-gray-500'>
										<svg
											fill='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											className='w-5 h-5'
											viewBox='0 0 24 24'>
											<path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z' />
										</svg>
									</a>
								</span>
							</div>
							<p className='leading-relaxed'>{product.description}</p>
							<div className='flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5'>
								<div className='flex'>
									<span className='mr-3'>Color</span>
									{allColors.map(color => (
										<button
											key={color}
											ref={colorBtn}
											className={`border-2 rounded-full w-6 h-6 ml-1 `}
											style={{
												backgroundColor: color,
												border: `3px solid ${color === Color ? 'black' : '#FEBBCC'}`,
											}}
											value={color}
											onClick={e => {
												pageRefresh(e.target.value, sizeOption.current.value);
											}}></button>
									))}
								</div>
								<div className='flex ml-6 items-center'>
									<span className='mr-3'>Size</span>
									<div className='relative'>
										<select
											className='rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10'
											ref={sizeOption}
											onChange={e => {
												pageRefresh(Color, e.target.value);
											}}
											value={Size}>
											{allSize.map(size => (
												<option key={size} defaultChecked>
													{size}
												</option>
											))}
										</select>
										<span className='absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center'>
											<svg
												fill='none'
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												className='w-4 h-4'
												viewBox='0 0 24 24'>
												<path d='M6 9l6 6 6-6' />
											</svg>
										</span>
									</div>
								</div>
							</div>
							<div className='flex'>
								<span className='title-font font-medium text-2xl text-gray-900'>₹{product.price}</span>
								<button
									className='flex ml-4 text-white bg-pink-500 border-0 lg:py-2 lg:px-6 focus:outline-none hover:bg-pink-600 rounded md:p-4 md:px-2 items-center justify-center p-2'
									onClick={() => addToCart(slug, 1, product.price, product.title, Size, Color)}>
									Add to cart
								</button>
								<button
									className='flex text-white ml-4 bg-pink-500 border-0 lg:py-2 lg:px-6 focus:outline-none hover:bg-pink-600 rounded md:p-4 md:px-2 items-center justify-center p-2'
									onClick={() => buyNow(slug, 1, product.price, product.title, Size, Color)}>
									Buy Now
								</button>
								<button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
									<svg
										fill='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-5 h-5'
										viewBox='0 0 24 24'>
										<path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-2.06-2.06a5.5 5.5 0 00-7.78 7.78l1.06 2.06L12 21.23l7.78-7.78 2.06-2.06a5.5 5.5 0 000-7.78z' />
									</svg>
								</button>
							</div>
							<div className='flex justify-between mt-5'>
								<input
									type='number'
									name='pincode'
									id='pincode'
									className='border-solid border no-spinner border-black'
									ref={pincode}
									onChange={e => onChangePin(e)}
								/>
								<button
									onClick={checkServiceability}
									className='flex ml-4 mr-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded'>
									Check
								</button>
							</div>
							<div className='mt-4'>
								<span>
									{isServicable === null
										? 'Please check pincode eligibility'
										: isServicable
										? 'Your Pincode is servicable'
										: "We don't deliver at your pincode Yet!"}
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Slug;

export async function getServerSideProps(context) {
	await dbConnect();
	console.log('slug', context.query.slug);

	const product = await Product.find({ slug: context.query.slug });

	let varient = await Product.find({ title: product[0].title, availQty: { $gt: 0 }, category: product[0].category });

	let colorSizeSlug = {};

	varient.forEach(item => {
		if (item.color in colorSizeSlug) {
			colorSizeSlug[item.color][item.size] = { slug: item.slug };
		} else {
			colorSizeSlug[item.color] = { [item.size]: { slug: item.slug } };
		}
	});

	return {
		props: { product: JSON.parse(JSON.stringify(product[0])), varients: JSON.parse(JSON.stringify(colorSizeSlug)) },
	};
}
