import {
	useState,
	useEffect,
	useContext,
	useReducer,
	useCallback,
} from 'react';
import { Button, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddBook } from './components/AddBook';
import useFetch from './hooks/useFetch';
import { LoginContext } from './context/LoginContext';
import Cookies from 'js-cookie';

function App() {
	useFetch('/books', 'GET', {}, null);
	let cookie = Cookies.get('access_token');

	useEffect(() => {
		console.log(cookie);
	}, [cookie]);

	const token = localStorage.getItem('accesstoken');
	const { isLogin, setIsLogin } = useContext(LoginContext);

	const [showForm, setShowForm] = useState(false);
	const containerStyle = {
		width: '80vw',
		minHeight: '80vh',
		margin: 'auto',
	};
	return (
		<Container
			className='mt-5 d-flex flex-column gap-5 align-items-center'
			style={containerStyle}
		>
			<div className='header d-flex flex-column justify-content-start text-start'>
				<h1 className='fs-1'>Welcome to Book Store!</h1>
				<h1 className='fs-3'>
					search all of the amazing books, or publish and sell your best books!
				</h1>
				{isLogin && (
					<Button
						className='align-self-start'
						onClick={() => setShowForm((prev) => (prev = true))}
					>
						Sell Book
					</Button>
				)}
			</div>
			<div className='body w-50'>
				<AddBook showForm={showForm} setShowForm={setShowForm} />
			</div>
		</Container>
	);
}

export default App;
