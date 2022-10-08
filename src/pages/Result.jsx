import { Container } from 'react-bootstrap';

const Result = ({ keywords }) => {
	return (
		<Container>
			<h1>Result for {keywords}...</h1>
			<p className='text-muted'>0 result found</p>
		</Container>
	);
};

export default Result;
