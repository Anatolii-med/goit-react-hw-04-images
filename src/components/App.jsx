import React from 'react';
import Gallery from './ImageGallery/ImageGallery';
import fetchFunc from '../services/fetchImage';
import SearchBar from './Searchbar/searchbar';
import Button from './Button/button';
import Spinner from './Loader/loader';
import { Modal } from './Modal/modal';
import Notiflix from 'notiflix';

class App extends React.Component {
    state = {
        status: 'idle',
        searchImg: null,
        pagination: 1,
        imagesArray: [],
        error: '',
        modalImgURL: '',
    };

    async componentDidUpdate(prevProps, prevState) {
        const { searchImg, pagination } = this.state;
        const searchImgPrev = prevState.searchImg;
        const paginationPrev = prevState.pagination;

        if (searchImgPrev !== searchImg || paginationPrev !== pagination) {
            try {
                const data = await fetchFunc(searchImg, pagination);
                if (data.total === 0) {
                    this.onMessage(
                        'failure',
                        `Мы не смогли найти ваш запрос "${searchImg}"`
                    );
                    this.setState({ status: 'rejected' });
                    return;
                }

                if (pagination === 1) {
                    this.onMessage(
                        'success',
                        `По запросу "${searchImg}" мы нашли ${data.totalHits} изображений`
                    );
                }

                this.setState(prevState => ({
                    imagesArray: [...prevState.imagesArray, ...data.hits],
                    status: 'resolved',
                }));
            } catch (error) {
                this.setState({ error, status: 'rejected' });
            }
        }
    }

    onMessage = (type, message) => {
        Notiflix.Notify[type](message);
    };

    resetPagination = () => {
        this.setState({ pagination: 1, imagesArray: [] });
    };

    onSearchSubmit = searchValue => {
        this.setState({ searchImg: searchValue, status: 'pending' });
        this.resetPagination();
    };

    updatePaginationPage = () => {
        this.setState(prevState => ({ pagination: prevState.pagination + 1 }));
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    onModalOpen = modalImgURL => {
        this.setState({ modalImgURL: modalImgURL, status: 'modal' });
        console.log('fullImgUrl :>> ', modalImgURL);
    };

    onModalClose = () => {
        this.setState({ modalImgURL: '', status: 'resolved' });
    };

    submitData = data => {
        this.setState({ imagesArray: data });
    };

    render() {
        if (this.state.status === 'idle') {
            return (
                <>
                    <SearchBar
                        onSubmit={this.onSearchSubmit}
                        onError={this.onMessage}
                    />
                </>
            );
        }

        if (this.state.status === 'pending') {
            return (
                <>
                    <SearchBar
                        onSubmit={this.onSearchSubmit}
                        onError={this.onMessage}
                    />
                    <Spinner />
                </>
            );
        }

        if (this.state.status === 'resolved') {
            return (
                <>
                    <SearchBar
                        onSubmit={this.onSearchSubmit}
                        onError={this.onMessage}
                    />
                    <Gallery
                        images={this.state.imagesArray}
                        onItemClick={this.onModalOpen}
                    />
                    <Button onClick={this.updatePaginationPage} />
                </>
            );
        }

        if (this.state.status === 'modal') {
            return (
                <>
                    <SearchBar
                        onSubmit={this.onSearchSubmit}
                        onError={this.onMessage}
                    />
                    <Gallery images={this.state.imagesArray} />
                    <Modal
                        largeImageUrl={this.state.modalImgURL}
                        onClose={this.onModalClose}
                    />
                </>
            );
        }
        if (this.state.status === 'rejected') {
            return (
                <SearchBar
                    onSubmit={this.onSearchSubmit}
                    onError={this.onMessage}
                />
            );
        }
    }
}

export default App;
