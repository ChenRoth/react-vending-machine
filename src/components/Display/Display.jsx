import React from 'react';

export class Display extends React.Component {
    render() {
        const {msg} = this.props;
        return (
            <div>{msg}</div>
        )
    }
}