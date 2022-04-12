import React from 'react';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Overlay, ModalImg } from './modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ largeImageUrl, onClose }) {
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		disableBodyScroll(modalRoot);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			enableBodyScroll(modalRoot);
		};
	});

	const handleKeyDown = e => {
		if (e.code === 'Escape') {
			onClose();
		}
	};
	const handleClickModal = e => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return createPortal(
		<Overlay onClick={handleClickModal}>
			<ModalImg>
				<img src={largeImageUrl} alt="someImage" />
			</ModalImg>
		</Overlay>,
		modalRoot
	);
}

// export class oldModal extends React.Component {
// 	componentDidMount() {
// 		window.addEventListener('keydown', this.handleKeyDown);
// 		disableBodyScroll(modalRoot);
// 	}

// 	componentWillUnmount() {
// 		window.removeEventListener('keydown', this.handleKeyDown);
// 		enableBodyScroll(modalRoot);
// 	}

// handleKeyDown = e => {
// 	if (e.code === 'Escape') {
// 		this.props.onClose();
// 	}
// };

// handleClickModal = e => {
// 	if (e.target === e.currentTarget) {
// 		this.props.onClose();
// 	}
// }
// render() {
// 	return createPortal(
// 		<Overlay onClick={this.handleClickModal}>
// 			<ModalImg>
// 				<img src={this.props.largeImageUrl} alt="someImage" />
// 			</ModalImg>
// 		</Overlay>,
// 		modalRoot
// 	);
// }
// }
