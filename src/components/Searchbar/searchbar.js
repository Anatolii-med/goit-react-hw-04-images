import React from 'react';
import {
    SearchbarHeader,
    SearchForm,
    SearchFormButton,
    SearchFormButtonLabel,
    SearchFormInput,
} from './searchbar.styled';

class SearchBar extends React.Component {
    state = {
        imageData: '',
    };

    componentDidUpdate(prevProps, prevState) {}

    onHandleInput = e => {
        const { value } = e.target;
        this.setState({ imageData: value });
    };

    onSubmitSearch = e => {
        e.preventDefault();

        if (this.state.imageData.trim() === '') {
            return this.props.onError(
                'warning',
                'Введите в строку поиска какое изображение хотите найти'
            );
        }

        this.props.onSubmit(this.state.imageData);
        this.setState({ imageData: '', pagination: 1 });
    };

    render() {
        return (
            <SearchbarHeader>
                <SearchForm onSubmit={this.onSubmitSearch}>
                    <SearchFormButton type="submit">
                        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                    </SearchFormButton>

                    <SearchFormInput
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.onHandleInput}
                        value={this.state.imageData}
                    />
                </SearchForm>
            </SearchbarHeader>
        );
    }
}

export default SearchBar;
