import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Signup = () => {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const router = useRouter();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			router.push('/');
		}
	}, []);

	const handleChange = e => {
		if (e.target.name === 'name') {
			setName(e.target.value);
		} else if (e.target.name === 'email') {
			setEmail(e.target.value);
		} else if (e.target.name === 'password') {
			setPassword(e.target.value);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const data = { name, email, password };
		try {
			const res = await axios.post('/api/Signup', data);
			if (res.data) {
				toast.success('Account created Successfully!', {
					position: 'top-center',
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			}
		} catch (error) {
			toast.error('Something went wrong Please try again!', {
				position: 'top-center',
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
			console.error(error);
		}
	};

	return (
		<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<Image className='mx-auto h-10 w-auto' src='/tshirt.png' alt='logo' width={100} height={140} />
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Sign up to your account
				</h2>
			</div>
			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form className='space-y-6' onSubmit={e => handleSubmit(e)}>
					<div>
						<label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>
							Name
						</label>
						<div className='mt-2'>
							<input
								onChange={handleChange}
								id='name'
								name='name'
								type='text'
								autoComplete='email'
								required={true}
								className='block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6'
								placeholder='Your Name'
							/>
						</div>
					</div>
					<div>
						<label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
							Email address
						</label>
						<div className='mt-2'>
							<input
								onChange={handleChange}
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required={true}
								className='block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6'
								placeholder='Your Email'
							/>
						</div>
					</div>
					<div>
						<div className='flex items-center justify-between'>
							<label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
								Password
							</label>
						</div>
						<div className='mt-2'>
							<input
								onChange={handleChange}
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required={true}
								className='block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6'
								placeholder='Your Password'
							/>
						</div>
					</div>
					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600'>
							Sign Up
						</button>
					</div>
				</form>
				<p className='mt-10 text-center text-sm text-gray-500'>
					Not a member?
					<Link href='/login' className='font-semibold leading-6 text-pink-600 hover:text-pink-500'>
						&nbsp;Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
