import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MyAccount = () => {
	const router = useRouter();
	useEffect(() => {
		if (!localStorage.getItem('token')) {
			router.push('/');
		}
		console.log(router.query);
	}, [router.query]);

	return <div>MyAccount</div>;
};

export default MyAccount;
