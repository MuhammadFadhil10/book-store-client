import { Button, Form, InputGroup, Navbar, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';

const Navigation = () => {
	const token = localStorage.getItem('accesstoken');
	const { isLogin, setIsLogin } = useContext(LoginContext);
	useEffect(() => {
		token ? setIsLogin(true) : setIsLogin(false);
	}, [token]);

	const navStyle = {
		width: '100vw',
		left: '0',
		zIndex: '1',
	};
	return (
		<Navbar
			className='bg-dark d-flex position-fixed top-0 justify-content-around shadow'
			style={navStyle}
		>
			<Navbar.Brand>
				<Link to='/' className='text-light'>
					Book Store
				</Link>
			</Navbar.Brand>
			<Form>
				{/* <Form.Group> */}
				<InputGroup className='d-flex justify-content-between'>
					<Form.Control type='text' placeholder='Search Book..'></Form.Control>
					<InputGroup.Text>
						<BiSearch
							color='#707070'
							// style={iconStyle}
							cursor='pointer'
							size={25}
							// className='bg-light mt-1'

							// onClick={() => alert('haloo')}
						/>
					</InputGroup.Text>
				</InputGroup>
				{/* </Form.Group> */}
			</Form>
			<ul className='d-flex list-unstyled gap-5 mt-2 d-flex align-items-center'>
				{!isLogin ? (
					<>
						<li>
							{' '}
							<Link to='/login' className='text-light'>
								<Button>Login</Button>
							</Link>{' '}
						</li>
						<li>
							{' '}
							<Link to='/register' className='text-light'>
								<Button variant='outline-primary'>Register</Button>
							</Link>{' '}
						</li>
					</>
				) : (
					<>
						<li>
							{' '}
							<Link to='/'>Home</Link>{' '}
						</li>
						<li>
							{' '}
							<Link to='/profile'>profile</Link>{' '}
						</li>
						<li>
							<Button
								variant='outline-danger'
								onClick={() => {
									localStorage.clear();
									setIsLogin(false);
								}}
							>
								Logout
							</Button>
						</li>
					</>
				)}
			</ul>
		</Navbar>
	);
};

export default Navigation;
