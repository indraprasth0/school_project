import Image from 'next/image';
import React from 'react';
import { ThemeColorToggle } from './theme-color-toggle';
import { ThemeModeToggle } from './theme-mode-toggle';
import FormModal from './FormModal';

const Navbar = () => {
    return (
        <div className='flex items-center'>
            <div className="items-center gap-4 px-4 ">
                <Image
                    src="/shree.png"
                    alt="avatar"
                    width={60}
                    height={60}
                    className="rounded-full shadow-md shadow-black logo"
                    style={{ width: "auto", height: "auto" }} // ✅ Aspect Ratio Maintain होईल
                    priority={true}
                />
            </div>
            <div className="w-full flex items-center justify-between p-1 pb-3 md:p-2 gap-1 md:px-4 md:gap-4">
                {/* SEARCH BAR, Color Theme and Mode */}
                <div className='flex gap-2 md:gap-4'>
                    <div className='hidden md:flex items-center gap-1 text-sm rounded-full ring-[1.5px] ring-primary bg-transparent px-2 h-[28px] my-auto'>
                        <Image src="/search.png" alt="search" width={16} height={16} className="object-contain" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className='bg-transparent border-none outline-none text-p800 placeholder:text-p400 text-xs w-32 md:w-40 lg:w-56 h-full'
                        />
                    </div>
                    <div className="flex flex-col">
                        <ThemeModeToggle />
                        <ThemeColorToggle />
                    </div>
                </div>

                <div className="hidden lg:flex items-start gap-3 px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-2">
                    {/* Logo */}
                    <div className="min-w-[50px] md:min-w-[60px]">
                        <Image
                            src="/indraprastha logo.jpg"
                            alt="School Logo"
                            width={50}
                            height={50}
                            className="rounded-full shadow-md shadow-black object-cover"
                            style={{ width: "55px", height: "55px" }}
                            priority
                        />
                    </div>

                    {/* Name and Tagline - shown on separate lines but no wrapping */}
                    <div className="flex flex-col items-center justify-center overflow-hidden">
                        <h1 className="whitespace-nowrap overflow-hidden text-ellipsis text-base md:text-xl lg:text-2xl font-bold text-p800">
                            Indraprastha Computer Education
                        </h1>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis text-xs md:text-sm lg:text-base text-p600 font-medium">
                            On the path of knowledge, moving ahead with technology!
                        </span>
                    </div>
                </div>
                {/* ICONS AND USER */}
                <div className="flex items-center gap-2 md:gap-4 ">
                    <div className="flex items-center justify-center cursor-pointer rounded-full w-7 h-7 relative">
                        <FormModal table="other" type="announcement" id={"AA2"} />
                        <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-secondary text-xs'>2</div>
                    </div>
                    <div className="flex items-center justify-center cursor-pointer rounded-full w-7 h-7 relative">
                        <FormModal table="other" type="message" id={"AA1"} />
                        <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-secondary text-xs'>3</div>
                    </div>
                    <div className='flex flex-col pl-2'>
                        <span className={`font-semibold text-[18px] text-center`}>Pankaj Patil</span>
                        <span className='text-sm text-center'>Admin</span>
                    </div>
                    <Image
                        src="/avatar.jpg"
                        alt="School Logo"
                        width={60}
                        height={60}
                        className="rounded-full shadow-md shadow-black object-cover"
                        style={{ width: "60px", height: "60px" }}
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
