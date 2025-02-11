import React from 'react';

const Button = ({text}) => {
    return (
        <button className='px-5 py-2 border-2 border-primary hover:bg-transparent duration-200  bg-primary'>
            {text}
        </button>
    );
};

export default Button;