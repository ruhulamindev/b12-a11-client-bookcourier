import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to = "/" className='flex items-center gap-2'>
            <img className='w-10 h-10 border-2 border-green-500 rounded-full' src="/logo.jpg" alt="logo" />
            <h3 className='text-xl font-bold'>BookCourier </h3>
        </Link>
    );
};

export default Logo;