import React from 'react';

const Logo = () => {
    return (
        <div className='flex items-center gap-2'>
            <img className='w-10 h-10 border-2 border-green-500 rounded-full' src="/logo.jpg" alt="logo" />
            <h3 className='text-xl font-bold'>BookCourier </h3>
        </div>
    );
};

export default Logo;