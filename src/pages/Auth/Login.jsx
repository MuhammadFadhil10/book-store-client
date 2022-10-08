import { useContext, useEffect, useState } from 'react';
import {
	Alert,
	Button,
	Container,
	FloatingLabel,
	Form,
	Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import useFetch from '../../hooks/useFetch';

export function Login() {
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [postError, setPostError] = useState(false);
	const [showAlert, setShowAlert] = useState(true);
	const { isLogin, setIsLogin } = useContext(LoginContext);
	// const token = localStorage.getItem('accesstoken');

	const loginBody = {
		email: emailValue,
		password: passwordValue,
	};

	const { postData, response, isLoading } = useFetch(
		'/login',
		'POST',
		loginBody,
		'sadsadwqcsac'
	);

	const inputErrorStyle = {
		border: '1px solid red',
	};

	useEffect(() => {
		if (response.data) {
			setShowAlert(true);
			response.status
				? setPostError((prev) => false)
				: setPostError((prev) => true);
			setTimeout(() => {
				setShowAlert(false);
			}, 3000);
			localStorage.setItem('accesstoken', response.data.accessToken);
			setIsLogin(true);
		}
	}, [response]);

	return (
		<Container className=''>
			<h1 className='fs-2 mb-5'>Sign in</h1>
			{response.message
				? showAlert && (
						<Alert variant={response.status ? 'success' : 'danger'}>
							{response.message}
						</Alert>
				  )
				: ''}
			<Form>
				<Form.Group className='shadow mb-3'>
					<FloatingLabel label='email'>
						<Form.Control
							type='email'
							value={emailValue}
							onChange={(e) => setEmailValue((prev) => e.target.value)}
							placeholder='email'
							style={postError ? inputErrorStyle : {}}
						></Form.Control>
					</FloatingLabel>
				</Form.Group>
				<Form.Group className='shadow mb-3'>
					<FloatingLabel label='password'>
						<Form.Control
							type='password'
							value={passwordValue}
							onChange={(e) => setPasswordValue((prev) => e.target.value)}
							placeholder='password'
							style={postError ? inputErrorStyle : {}}
						></Form.Control>
					</FloatingLabel>
				</Form.Group>
				{isLoading ? (
					<Button
						className='mb-5 m-auto d-flex align-items-center justify-content-center '
						disabled
						style={{ width: '200px' }}
					>
						<Spinner
							animation='border'
							role='status'
							size='sm'
							className='mx-2'
						></Spinner>
						<span>Logging in..</span>
					</Button>
				) : (
					<Button className='mb-5' onClick={() => postData()}>
						Login
					</Button>
				)}
				<p>
					doesn't have an account? <Link to='/register'>Register</Link> here
				</p>
			</Form>
		</Container>
	);
}
