import React from 'react';
import {
    ImageGalleryItem,
    ImageGalleryItemImage,
} from './imageGalleryItem.styled';

export default class Item extends React.Component {
    render() {
        const { largeImageURL, sours, altern, id, onClick } = this.props;

        return (
            <ImageGalleryItem key={id} onClick={() => onClick(largeImageURL)}>
                <ImageGalleryItemImage src={sours} alt={altern} />
            </ImageGalleryItem>
        );
    }
}
