import React from 'react';

const Button = ({text}) => {
    return (
        <button className='px-5 py-2 border-2 border-primary hover:bg-transparent duration-200  bg-primary dark:text-white dark:bg-gray-900 dark:border-white hover:dark:bg-white hover:dark:text-black '>
            {text}
        </button>
    );
};

export default Button;