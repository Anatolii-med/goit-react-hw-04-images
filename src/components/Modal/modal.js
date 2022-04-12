import React from 'react';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Overlay, ModalImg } from './modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        disableBodyScroll(modalRoot);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        enableBodyScroll(modalRoot);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleClickModal = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    };
    render() {
        return createPortal(
            <Overlay onClick={this.handleClickModal}>
                <ModalImg>
                    <img src={this.props.largeImageUrl} alt="someImage" />
                </ModalImg>
            </Overlay>,
            modalRoot
        );
    }
}
