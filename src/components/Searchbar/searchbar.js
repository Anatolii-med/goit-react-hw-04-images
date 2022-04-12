import React from 'react';
import { useState } from 'react';
import {
	SearchbarHeader,
	SearchForm,
	SearchFormButton,
	SearchFormButtonLabel,
	SearchFormInput,
} from './searchbar.styled';

function SearchBar({ onSubmit, onError }) {
	const [imageData, setImageData] = useState('');

	const onHandleInput = e => {
		const { value } = e.target;
		setImageData(value);
	};

	const onSubmitSearch = e => {
		e.preventDefault();

		if (imageData.trim() === '') {
			return onError(
				'warning',
				'Введите в строку поиска какое изображение хотите найти'
			);
		}

		onSubmit(imageData);
		setImageData('');
	};

	return (
		<SearchbarHeader>
			<SearchForm onSubmit={onSubmitSearch}>
				<SearchFormButton type="submit">
					<SearchFormButtonLabel>Search</SearchFormButtonLabel>
				</SearchFormButton>

				<SearchFormInput
					type="text"
					autoComplete="off"
					autoFocus
					placeholder="Search images and photos"
					onChange={onHandleInput}
					value={imageData}
				/>
			</SearchForm>
		</SearchbarHeader>
	);
}

export default SearchBar;
