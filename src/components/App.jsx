import React from 'react';
import Gallery from './ImageGallery/ImageGallery';
import fetchFunc from '../services/fetchImage';
import SearchBar from './Searchbar/searchbar';
import Button from './Button/button';
import Spinner from './Loader/loader';
import { Modal } from './Modal/modal';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

function App() {
	const [status, setStatus] = useState('idle');
	const [searchImg, setSearchImg] = useState(null);
	const [pagination, setPagination] = useState(1);
	const [imagesArray, setImagesArray] = useState([]);
	const [error, setError] = useState('');
	const [modalImgURL, setModalImgURL] = useState('');

	useEffect(() => {
		if (!searchImg) {
			return;
		}
		try {
			fetchFunc(searchImg, pagination).then(data => {
				if (data.total === 0) {
					onMessage(
						'error',
						`Мы не смогли найти ваш запрос "${searchImg}"`
					);
					setStatus('rejected');
					return;
				}
				if (pagination === 1) {
					onMessage(
						'success',
						`По запросу "${searchImg}" мы нашли ${data.totalHits} изображений`
					);
				}

				setImagesArray(prevImages => [...prevImages, ...data.hits]);
				setStatus('resolved');
			});
		} catch (error) {
			setError(error);
			setStatus('rejected');
		}
	}, [pagination, searchImg]);

	const onMessage = (type, message) => {
		toast[type](message, { position: 'top-right' });
	};

	const resetPagination = () => {
		setPagination(1);
		setImagesArray([]);
	};

	const onSearchSubmit = searchValue => {
		setSearchImg(searchValue);
		setStatus('pending');
		resetPagination();
	};

	const updatePaginationPage = () => {
		setPagination(prevState => prevState + 1);
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth',
		});
	};

	const onModalOpen = modalImgURL => {
		setModalImgURL(modalImgURL);
		setStatus('modal');
	};

	const onModalClose = () => {
		setModalImgURL('');
		setStatus('resolved');
	};

	const submitData = data => {
		setImagesArray(data);
	};

	if (status === 'idle') {
		return (
			<>
				<SearchBar onSubmit={onSearchSubmit} onError={onMessage} />
				<Toaster />
			</>
		);
	}

	if (status === 'pending') {
		return (
			<>
				<SearchBar onSubmit={onSearchSubmit} onError={onMessage} />
				<Spinner />
				<Toaster />
			</>
		);
	}

	if (status === 'resolved') {
		return (
			<>
				<SearchBar onSubmit={onSearchSubmit} onError={onMessage} />
				<Gallery images={imagesArray} onItemClick={onModalOpen} />
				<Button onClick={updatePaginationPage} />
				<Toaster />
			</>
		);
	}

	if (status === 'modal') {
		return (
			<>
				<SearchBar onSubmit={onSearchSubmit} onError={onMessage} />
				<Gallery images={imagesArray} />
				<Modal largeImageUrl={modalImgURL} onClose={onModalClose} />
				<Toaster />
			</>
		);
	}
	if (status === 'rejected') {
		return (
			<>
				<SearchBar onSubmit={onSearchSubmit} onError={onMessage} />;
				<Toaster />;
			</>
		);
	}
}

export default App;
