import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';

export default function App({ Component, pageProps }) {
	const router = useRouter();
	const [cart, setCart] = useState({});
	const [subTotal, setSubTotal] = useState(0);
	const [user, setUser] = useState({ value: null });
	const [key, setKey] = useState();
	const [progress, setProgress] = useState(0);

	const saveCart = newCart => {
		localStorage.setItem('cart', JSON.stringify(newCart));
		console.log(subTotal);

		let subt = 0;
		console.log('cart', cart);

		const keys = Object.keys(newCart);
		console.log('keys length', keys.length);
		for (let i = 0; keys.length > i; i++) {
			subt += newCart[keys[i]].price * newCart[keys[i]].qty;
		}
		console.log('subt', subt);
		setSubTotal(subt);
		localStorage.setItem('subTotal', JSON.stringify(subt));
	};
	const clearCart = cart => {
		setCart({});
		localStorage.removeItem('cart');
		setSubTotal(0);
		localStorage.removeItem('subTotal');
		console.log('Your cart has been cleared');
	};

	const addToCart = (itemCode, qty, price, name, size, varient) => {
		let newCart = cart;
		if (itemCode in cart) {
			newCart[itemCode].qty += 1;
		} else {
			newCart[itemCode] = { qty: 1, price, name, size, varient };
		}
		setCart(newCart);
		saveCart(newCart);
		toast.success('Item added to cart!', {
			position: 'top-center',
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		});
	};
	const removeFromCart = (itemCode, qty, price, name, size, varient) => {
		let newCart = cart;
		console.log(newCart[itemCode]);
		if (itemCode in cart) {
			newCart[itemCode].qty -= 1;
		}
		if (newCart[itemCode].qty <= 0) {
			delete newCart[itemCode];
		}
		setCart(newCart);
		saveCart(newCart);
	};

	const buyNow = (itemCode, qty, price, name, size, varient) => {
		// let newCart = { [itemCode]: { [qty]: 1, price, name, size, varient } };
		let newCart = { [itemCode]: { qty: qty, price, name, size, varient } };
		setCart(newCart);
		saveCart(newCart);
		router.push('/checkout');
	};

	const logout = () => {
		localStorage.removeItem('token');
		toast.success('Logged Out Successfully', {
			position: 'top-right',
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		});
		setTimeout(() => {
			setUser({ value: null });
			setKey(Math.random());
		}, 2000);
		router.push('/');
	};
	useEffect(() => {
		try {
			if (localStorage.getItem('cart')) {
				setCart(JSON.parse(localStorage.getItem('cart')));
			}
			if (localStorage.getItem('subTotal')) {
				setSubTotal(JSON.parse(localStorage.getItem('subTotal')));
			}
		} catch (error) {
			console.error(`The error is  ${error}`);
			localStorage.clear();
		}
		const token = localStorage.getItem('token');
		if (token) {
			setUser({ value: token });
			setKey(Math.random());
		}
	}, [router.query]);

	useEffect(() => {
		const handleRouteChange = value => {
			console.log(value);
			setProgress(value);
		};
		router.events.on('routeChangeStart', (url, { shallow }) => handleRouteChange(40));
		router.events.on('routeChangeComplete', (url, { shallow }) => handleRouteChange(100));
	}, []);

	return (
		<>
			<LoadingBar color='#ff2d55' progress={progress} waitingTime={400} onLoaderFinished={() => setProgress(0)} />
			<Navbar
				key={key}
				user={user}
				cart={cart}
				addToCart={addToCart}
				removeFromCart={removeFromCart}
				clearCart={clearCart}
				subTotal={subTotal}
				logout={logout}
			/>
			<Component
				cart={cart}
				addToCart={addToCart}
				removeFromCart={removeFromCart}
				clearCart={clearCart}
				subTotal={subTotal}
				buyNow={buyNow}
				setUser={setUser}
				{...pageProps}
			/>
			<Footer />
		</>
	);
}
