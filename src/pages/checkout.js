import React from 'react';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Checkout = ({ addToCart, cart, removeFromCart, clearCart, subTotal }) => {
	const initializeRazorpay = () => {
		return new Promise(resolve => {
			const script = document.createElement('script');
			script.src = 'https://checkout.razorpay.com/v1/checkout.js';

			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};

			document.body.appendChild(script);
		});
	};

	const makePayment = async () => {
		const res = await initializeRazorpay();

		if (!res) {
			console.log('Razorpay SDK Failed to load');
			return;
		}

		// Make API call to the serverless API
		const data = (await axios.post('/api/razorpay', { cart, subTotal })).data;
		console.log('data below');
		console.log(data);

		var options = {
			key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
			name: 'CodesWear',
			currency: data.currency,
			amount: data.amount,
			order_id: data.id,
			description: 'Thankyou for your test donation',
			image: 'https://manuarora.in/logo.png',
			handler: function (response) {
				console.log(response);

				// Validate payment at server - using webhooks is a better idea.
				console.log(response.razorpay_payment_id);
				console.log(response.razorpay_order_id);
				console.log(response.razorpay_signature);
			},
			prefill: {
				name: 'Nikhil',
				email: 'niikkhilsharma@gmail.com',
				contact: '8504920637',
			},
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

	return (
		<div className='container m-auto'>
			<Head>
				<meta name='viewport' content='width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0' />
			</Head>
			<div>
				<h1 className='font-bold text-3xl p-4 text-center'>Checkout</h1>
				<h2 className='text-xl font-bold py-4'>1. Delivery Details</h2>
				<div className='mx-auto flex'>
					<div className='px-2 w-1/2'>
						<div className='mb-4'>
							<label htmlFor='name' className='leading-7 text-sm text-gray-600'>
								Name:
							</label>
							<input
								type='text'
								id='name'
								name='name'
								className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
					</div>
					<div className='px-2 w-1/2'>
						<div className='relative mb-4'>
							<label htmlFor='email' className='leading-7 text-sm text-gray-600'>
								Email:
							</label>
							<input
								type='email'
								id='email'
								name='email'
								className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
					</div>
				</div>
				<div className='px-2'>
					<label htmlFor='Address'>Address</label>
					<textarea
						name='address'
						id='address'
						cols='10'
						rows='2'
						className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'></textarea>
				</div>
				<div className='mx-auto flex'>
					<div className='px-2 w-1/2'>
						<div className='mb-4'>
							<label htmlFor='phone' className='leading-7 text-sm text-gray-600'>
								Phone:
							</label>
							<input
								type='text'
								id='phone'
								name='phone'
								className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
					</div>
					<div className='px-2 w-1/2'>
						<div className='relative mb-4'>
							<label htmlFor='pincode' className='leading-7 text-sm text-gray-600'>
								Pincode:
							</label>
							<input
								type='pincode'
								id='pincode'
								name='pincode'
								className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h2 className='text-xl font-bold py-4'>2. Review Your Cart Item & Pay</h2>
				<div className='sideCart p-10 bg-pink-100'>
					<h2 className='font-bold text-xl text-center mb-8'>Shoping Cart</h2>
					<ol>
						{Object.keys(cart).length === 0 && (
							<div className='text-xl text-center border-solidshadow-2xl font-bold my-4 flex justify-center items-center'>
								<h1 className='mx-auto border-4 border-red-300 rounded-full p-2'>Your cart is empty</h1>
							</div>
						)}
						{Object.keys(cart).map((id, lenth) => (
							<li className='list-decimal font-semibold' key={id}>
								<div className='item flex my-4 justify-between items-center'>
									<div>
										{cart[id].name}( {cart[id].size}/{cart[id].varient})
									</div>
									<div className='w-1/3 flex justify-center items-center cursor-pointer text-pink-500'>
										<AiFillMinusCircle
											onClick={() => {
												removeFromCart(id, cart[id].qty, cart[id].price, cart[id].name, cart[id].size, cart[id].varient);
											}}
										/>
										<span className='mx-2'>{cart[id].qty}</span>
										<AiFillPlusCircle
											onClick={() => {
												addToCart(id, 1, cart[id].price, cart[id].name, cart[id].size, cart[id].varient);
											}}
										/>
									</div>
								</div>
							</li>
						))}
					</ol>
					<span className='font-bold '>Subtotal: ₹{subTotal}</span>

					<div className='flex justify-center items-center'>
						<button
							className='border-solid border rounded-full bg-white flex items-center text-xl p-2 justify-between px-4'
							onClick={makePayment}>
							<BsFillBagCheckFill className='mr-2' />
							Pay Now ₹{subTotal}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
