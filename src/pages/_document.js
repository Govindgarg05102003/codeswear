import { Html, Head, Main, NextScript } from 'next/document';
import Footer from '@/components/Footer';

export default function Document() {
	return (
		<Html lang='en' className='overflow-x-hidden '>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
