import { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { ThemeContext } from '../context/ThemeContext';
import { TitleContext } from '../context/TitleContext';

const Profile = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	const title = useContext(TitleContext);
	document.body.style.backgroundColor = theme;
	return (
		<Container>
			<h1>Hello from profile</h1>
			<h1>{title}</h1>
		</Container>
	);
};

export default Profile;
