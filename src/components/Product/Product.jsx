import React from 'react';

const SOLD_OUT_IMG = 'https://f0.pngfuel.com/png/157/461/sold-out-signage-png-clip-art.png';

export function Product({img, price}) {
    return (
        <div>
            <img style={{height: 100}} src={img ? img : SOLD_OUT_IMG} alt="leave-me-alone-in-your-mother"/>
            <p>{price || 0}</p>
        </div>
    )
}
