import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import {
	Button,
	CloseButton,
	Container,
	Dropdown,
	DropdownButton,
	FloatingLabel,
	Form,
	InputGroup,
} from 'react-bootstrap';

export const AddBook = ({ showForm, setShowForm }) => {
	// state variable
	const [titleValue, setTitleValue] = useState('');
	const [synopsisValue, setSynopsisValue] = useState('');
	const [imageValue, setImageValue] = useState('');
	const [pageValue, setPageValue] = useState('');
	const [yearValue, setYearValue] = useState('');
	const [priceValue, setPriceValue] = useState('');
	const [quantityValue, setQuantityValue] = useState('');
	const [genreValue, setGenreValue] = useState([]);
	// normal variable
	let yearList = [];

	//
	for (let i = 1980; i <= new Date().getFullYear(); i++) {
		yearList.push(i);
	}

	const genreList = [
		'art',
		'computer',
		'drama',
		'design',
		'education',
		'fashion',
		'fantasy',
		'game',
		'indie',
		'korea',
		'mystery',
		'novel',
		'sport',
		'science',
		'technology',
	];

	const [choosedGenre, setChoosedGenre] = useState([]);
	const genreStyle = {
		border: '2px solid #ababab',
		minWidth: '100px',
		wordBreak: 'break-all',
	};

	function deleteGenre(str) {
		const index = choosedGenre.indexOf(str, 0);
		choosedGenre.splice(index, 1);
		setChoosedGenre([...choosedGenre]);
	}
	const [page, setPage] = useState(0);
	return (
		<Container className={showForm ? 'd-block' : 'd-none'}>
			<div className='d-flex justify-content-between align-items-center'>
				<h1 className='fs-2'>Add Book</h1>
				<CloseButton
					title='close'
					onClick={() => setShowForm((prev) => (prev = false))}
				/>
			</div>
			<Form>
				{/* title */}
				<Form.Group>
					<FloatingLabel label="Book's title" className='mb-4 shadow'>
						<Form.Control type='text' placeholder='title'></Form.Control>
					</FloatingLabel>
				</Form.Group>
				{/* sypnosis */}
				<Form.Group className='mb-4' controlId='exampleForm.ControlTextarea1'>
					<Form.Control as='textarea' rows={3} />
				</Form.Group>
				{/* image */}
				<Form.Group controlId='formFile' className='mb-4 shadow'>
					<Form.Control type='file' />
				</Form.Group>
				{/* page */}
				<InputGroup size='sm' className='mb-4 shadow'>
					<InputGroup.Text id='inputGroup-sizing-sm'>
						Book's page
					</InputGroup.Text>
					<Form.Control
						aria-label='Small'
						aria-describedby='inputGroup-sizing-sm'
						value={page}
						onChange={(e) => setPage(e.target.value)}
						type='number'
					/>
					<Form.Range
						max={1000}
						value={page}
						onChange={(e) => setPage(e.target.value)}
					/>
				</InputGroup>
				{/* year */}
				<InputGroup className='mb-4 shadow'>
					<InputGroup.Text>Year</InputGroup.Text>
					<Form.Select
						className='w-25'
						variant='outline-secondary'
						title='Dropdown'
						id='input-group-dropdown-1'
					>
						<option disabled>Year</option>
						{yearList.map((year) => {
							return (
								<option value={year} key={year}>
									{year}
								</option>
							);
						})}
					</Form.Select>
				</InputGroup>
				{/* price */}
				<Form.Group>
					<FloatingLabel label="Book's Price" className='mb-4 shadow'>
						<Form.Control type='number' placeholder='price'></Form.Control>
					</FloatingLabel>
				</Form.Group>
				{/* quantity */}
				<Form.Group>
					<FloatingLabel label='Quantity' className='mb-4 shadow'>
						<Form.Control type='number' placeholder='quantity'></Form.Control>
					</FloatingLabel>
				</Form.Group>
				{/* genre */}
				<InputGroup className='mb-4 shadow'>
					<Form.Select
						className='w-25'
						variant='outline-secondary'
						title='Dropdown'
						id='input-group-dropdown-1'
						onChange={(e) => setChoosedGenre([...choosedGenre, e.target.value])}
					>
						<option disabled>Genre</option>
						{genreList.map((genre) => {
							return (
								<option value={genre} key={genre}>
									{genre.toUpperCase()}
								</option>
							);
						})}
					</Form.Select>
					<Form.Control
						className='w-75'
						placeholder='no genre you are looking for? add your own genre'
						onKeyDown={(e) => {
							if (e.key === ',') {
								setChoosedGenre([...choosedGenre, e.target.value]);
								e.target.value = '';
							}
						}}
					/>
				</InputGroup>
				{/* genre choosed */}
				<div
					className='d-flex gap-2 flex-wrap justify-content-center mb-4'
					style={{ minHeight: '50px' }}
				>
					{choosedGenre.map((genre) => {
						return (
							<div
								key={genre}
								className='rounded d-flex shadow align-items-center justify-content-center gap-2 p-1'
								style={genreStyle}
							>
								<p className='text-muted m-auto'>{genre}</p>
								<CloseButton
									title='delete'
									className='align-self-start'
									style={{ width: '5px', height: '5px' }}
									onClick={() => deleteGenre(genre)}
								/>
							</div>
						);
					})}
				</div>
				<Button className='float-end' onClick={() => test()}>
					Upload
				</Button>
			</Form>
		</Container>
	);
};
