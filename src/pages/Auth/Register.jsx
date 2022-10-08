import { useCallback, useEffect, useState } from 'react';
import {
	Alert,
	Button,
	Container,
	FloatingLabel,
	Form,
	Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

export function Register() {
	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [showAlert, setShowAlert] = useState(true);
	const [postError, setPostError] = useState(false);

	const registerBody = {
		name: nameValue,
		email: emailValue,
		password: passwordValue,
	};

	const { postData, response, isLoading } = useFetch(
		'/register',
		'POST',
		registerBody
	);

	const inputErrorStyle = {
		border: '1px solid red',
	};

	useEffect(() => {
		if (response.data) {
			response.status
				? setPostError((prev) => false)
				: setPostError((prev) => true);
		}
	}, [response]);

	useEffect(() => {
		if (response.data) {
			setShowAlert(true);
			response.status
				? setPostError((prev) => false)
				: setPostError((prev) => true);
			setTimeout(() => {
				setShowAlert(false);
			}, 3000);
		}
	}, [response]);

	return (
		<Container className=''>
			<h1 className='fs-2 mb-5'>Create Account</h1>
			{response.message
				? showAlert && (
						<Alert
							variant={response.status ? 'success' : 'danger'}
							// className={showAlert ? 'd-none' : 'd-block'}
						>
							{response.message}
						</Alert>
				  )
				: ''}
			<Form>
				<Form.Group className='shadow mb-3'>
					<FloatingLabel label='name'>
						<Form.Control
							type='text'
							value={nameValue}
							onChange={(e) => setNameValue((prev) => (prev = e.target.value))}
							placeholder='name'
						></Form.Control>
					</FloatingLabel>
				</Form.Group>
				<Form.Group className='shadow mb-3'>
					<FloatingLabel label='email'>
						<Form.Control
							type='email'
							value={emailValue}
							onChange={(e) => setEmailValue((prev) => (prev = e.target.value))}
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
							onChange={(e) =>
								setPasswordValue((prev) => (prev = e.target.value))
							}
							placeholder='password'
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
						<span>Registering..</span>
					</Button>
				) : (
					<Button className='mb-5' onClick={() => postData()}>
						Register
					</Button>
				)}
			</Form>
			<p>
				Already have account? <Link to='/login'>Login</Link> here
			</p>
		</Container>
	);
}
