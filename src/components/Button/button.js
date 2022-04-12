import React from 'react';
import { ButtonStyle, BtnWrap } from './button.styled';

export default class Button extends React.Component {
    render() {
        const { onClick } = this.props;
        return (
            <BtnWrap>
                <ButtonStyle type="button" onClick={onClick}>
                    Load more images
                </ButtonStyle>
            </BtnWrap>
        );
    }
}
