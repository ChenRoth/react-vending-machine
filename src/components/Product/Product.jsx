import React from 'react';

export function Product({img, price}) {
    return (
        <div>
            <img style={{height: 100}} src={img} alt="leave-me-alone-in-your-mother"/>
            <p>{price}</p>
        </div>
    )
}
