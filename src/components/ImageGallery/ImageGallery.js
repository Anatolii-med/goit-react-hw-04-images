import Item from 'components/ImageGalleryItem/imageGalleryItem';
import React from 'react';
import { ImageGalleryUl } from './ImageGallery.styled';

export default class ImageGallery extends React.Component {
    render() {
        return (
            <ImageGalleryUl>
                {this.props.images.map(item => {
                    return (
                        <Item
                            sours={item.webformatURL}
                            key={item.id}
                            altern={item.tags}
                            largeImageURL={item.largeImageURL}
                            onClick={this.props.onItemClick}
                        />
                    );
                })}
            </ImageGalleryUl>
        );
    }
}
