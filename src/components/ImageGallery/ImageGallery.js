import Item from 'components/ImageGalleryItem/imageGalleryItem';
import { ImageGalleryUl } from './ImageGallery.styled';

export default function ImageGallery({ images, onItemClick }) {
	return (
		<ImageGalleryUl>
			{images.map(item => {
				return (
					<Item
						sours={item.webformatURL}
						key={item.id}
						altern={item.tags}
						largeImageURL={item.largeImageURL}
						onClick={onItemClick}
					/>
				);
			})}
		</ImageGalleryUl>
	);
}
