import { Component } from 'react';
import { Rings } from 'react-loader-spinner';

export default class Spinner extends Component {
    render() {
        return (
            <div>
                <Rings
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            </div>
        );
    }
}
