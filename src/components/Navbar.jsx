import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ logout, user, addToCart, cart, removeFromCart, clearCart, subTotal }) => {
	const ref = useRef();
	const toggleCart = () => {
		ref.current.classList.toggle('translate-x-full');
	};
	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}
	return (
		<div className='flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md sticky top-0 z-10 bg-white'>
			<ToastContainer
				position='top-right'
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<div className='mr-auto sm:mx-5'>
				<Link href={'/'}>
					<Image
						src={'/logo.webp'}
						alt={'logo'}
						width={160}
						height={40}
						priority
						style={{ width: 'auto', height: 'auto' }}
					/>
				</Link>
			</div>
			<div className='nav py-4'>
				<ul className='flex items-center space-x-2 font-bold md:text-xl'>
					<Link className='hover:text-pink-600' href={'/tshirt'}>
						<li>Tshirts </li>
					</Link>
					<Link className='hover:text-pink-600' href={'/hoodies'}>
						<li>Hoodies </li>
					</Link>
					<Link className='hover:text-pink-600' href={'/stickers'}>
						<li>Stickers </li>
					</Link>
					<Link className='hover:text-pink-600' href={'/mugs'}>
						<li>Mugs </li>
					</Link>
				</ul>
			</div>
			<div className='cart absolute right-0 mx-5 top-2 cursor-pointer flex justify-center items-center'>
				{user.value && (
					<Menu as='div' className='relative inline-block text-left'>
						<div>
							<Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50'>
								<MdAccountCircle className='text-2xl md:text-3xl mx-2' />
							</Menu.Button>
						</div>

						<Transition
							as={Fragment}
							enter='transition ease-out duration-100'
							enterFrom='transform opacity-0 scale-95'
							enterTo='transform opacity-100 scale-100'
							leave='transition ease-in duration-75'
							leaveFrom='transform opacity-100 scale-100'
							leaveTo='transform opacity-0 scale-95'>
							<Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
								<div className='py-1'>
									<Menu.Item>
										{({ active }) => (
											<Link
												href='/myaccount'
												className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
												Profile
											</Link>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<Link
												href='/orders'
												className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
												Order
											</Link>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<button
												onClick={logout}
												className={classNames(
													active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
													'block w-full px-4 py-2 text-left text-sm'
												)}>
												Sign out
											</button>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				)}
				{!user.value && (
					<Link href={'/login'}>
						<button className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full mr-3'>Login</button>
					</Link>
				)}
				<AiOutlineShoppingCart className='text-2xl md:text-3xl' onClick={toggleCart} />
			</div>

			<div
				className='w-72 sideCart overflow-y-scroll absolute top-0 right-0 bg-white p-10 transition-transform translate-x-full z-20 h-[100vh]'
				ref={ref}>
				<h2 className='font-bold text-xl text-center'>Shoping Cart</h2>
				<span className='absolute top-2 right-2 cursor-pointer text-2xl text-pink-500' onClick={toggleCart}>
					<AiFillCloseCircle />
				</span>
				<ol>
					{Object.keys(cart).length === 0 && (
						<div className='text-xl text-center border-solid border-4 border-red-300 rounded-full shadow-2xl font-bold my-4'>
							Your cart is empty
						</div>
					)}
					{Object.keys(cart).map((id, lenth) => (
						<li className='list-decimal font-semibold' key={id}>
							<div className='item flex my-4'>
								<div className='w-2/3'>
									{cart[id].name}({cart[id].size}/{cart[id].varient})
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
				<div className='font-bold my-4'>Subtotal: ₹{subTotal}</div>
				<div className='flex item-center'>
					<Link href={'/checkout'}>
						<button className='flex mx-auto text-white bg-pink-500 border-0 p-2 focus:outline-none hover:bg-pink-600 rounded text-sm justify-center items-center'>
							<BsFillBagCheckFill className='mr-2' />
							Checkout
						</button>
					</Link>
					<button
						onClick={clearCart}
						className='flex mx-auto text-white bg-pink-500 border-0 p-2 py-1 focus:outline-none hover:bg-pink-600 rounded text-sm justify-center items-center ml-4'>
						Clear Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
