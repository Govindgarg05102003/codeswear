import dbConnect from '@/middleware/mongoose';
import order from '@/models/order';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Orders = () => {
	const router = useRouter();
	useEffect(() => {
		if (!localStorage.getItem('token')) {
			router.push('/');
		}
		console.log(router.query);
	}, [router.query]);
	return (
		<div>
			<div className='container mx-auto'>
				<h1 className='text-3xl font-semibold sm:px-6 lg:px-8 my-10 mt-16 text-center'>My Orders</h1>
				<div className='items'>
					<div className='flex flex-col'>
						<div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
							<div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
								<div className='overflow-hidden'>
									<table className='min-w-full text-left text-sm font-light'>
										<thead className='border-b font-medium dark:border-neutral-500'>
											<tr>
												<th scope='col' className='px-6 py-4'>
													#
												</th>
												<th scope='col' className='px-6 py-4'>
													First
												</th>
												<th scope='col' className='px-6 py-4'>
													Last
												</th>
												<th scope='col' className='px-6 py-4'>
													Handle
												</th>
											</tr>
										</thead>
										<tbody>
											<tr className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
												<td className='whitespace-nowrap px-6 py-4 font-medium'>1</td>
												<td className='whitespace-nowrap px-6 py-4'>Mark</td>
												<td className='whitespace-nowrap px-6 py-4'>Otto</td>
												<td className='whitespace-nowrap px-6 py-4'>@mdo</td>
											</tr>
											<tr className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
												<td className='whitespace-nowrap px-6 py-4 font-medium'>2</td>
												<td className='whitespace-nowrap px-6 py-4'>Jacob</td>
												<td className='whitespace-nowrap px-6 py-4'>Thornton</td>
												<td className='whitespace-nowrap px-6 py-4'>@fat</td>
											</tr>
											<tr className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
												<td className='whitespace-nowrap px-6 py-4 font-medium'>3</td>
												<td className='whitespace-nowrap px-6 py-4'>Larry</td>
												<td className='whitespace-nowrap px-6 py-4'>Wild</td>
												<td className='whitespace-nowrap px-6 py-4'>@twitter</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getServerSideProps(context) {
	await dbConnect();
	let orders = await order.find({});
	return {
		props: { order: orders },
	};
}

export default Orders;
