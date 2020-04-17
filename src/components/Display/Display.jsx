import React from 'react';
import './Display.css';

export class Display extends React.Component {
    render() {
        const {msg} = this.props;
        return (
            <div className="display">{msg}</div>
        )
    }
}