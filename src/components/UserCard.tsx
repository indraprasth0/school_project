"use client"
import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';



const UserCard = ({type}:{type:string}) => {
    const { theme } = useTheme();
 
    const isDarkMode = theme === 'dark';

    return (
        <div className='p-4 rounded-2xl shadow-md odd:bg-p300 even:bg-p500 flex-1 min-w-[130px]'>
            <div className="flex justify-between items-center pb-3">
                <span className='text-[10px] bg-p800 px-2 py-1 rounded-full text-p50'>2024-25</span>
                <Image src={isDarkMode ? "/more.png" : "/moreDark.png"} alt="more" width={20} height={20} />
            </div>
            <h1 className='text-2xl font-semibold my-4'>1,234</h1>
            <h2 className='capitalize text-sm font-medium text-p950'>{type}</h2>
        </div>
    );
}

export default UserCard;
