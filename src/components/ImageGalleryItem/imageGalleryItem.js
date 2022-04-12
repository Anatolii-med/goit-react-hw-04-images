import React from 'react';
import {
	ImageGalleryItem,
	ImageGalleryItemImage,
} from './imageGalleryItem.styled';

export default function Item({ largeImageURL, sours, altern, id, onClick }) {
	return (
		<ImageGalleryItem key={id} onClick={() => onClick(largeImageURL)}>
			<ImageGalleryItemImage src={sours} alt={altern} />
		</ImageGalleryItem>
	);
}
