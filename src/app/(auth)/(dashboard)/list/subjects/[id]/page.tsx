"use client"

import Image from 'next/image';
import React from 'react';
import BigCalendar from '@/components/BigCalendar';
import Link from 'next/link';
import Announcements from '@/components/Announcements';
import Performance from '@/components/Performance';
import { useTheme } from 'next-themes';


const SingleSubjectPage = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                {/* TOP */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* USER INFO CARD */}
                    <div className="bg-p300 py-6 px-4 rounded-md flex-1 flex gap-4 shadow-md">
                        <div className="w-[30%]">
                            <Image src="/Pankaj1.jpg" alt='Profile Photo' width={144} height={144} className="rounded-full w-36 h-36 object-cover shadow-md" />
                        </div>
                        <div className="w-[70%] flex flex-col justify-between gap-3 ">
                            <h1 className="text-xl font-semibold">Mr. Pankaj Patil</h1>
                            <p className="text-md text-p600">Full Stack Web Developer and Designer</p>
                            {/* <p className="text-md text-p600">Full Stack Web Developer, Designer, and Owner of Indraprastha Computer Educations, Sakri  </p> */}
                            <div className="flex items-center justify-between gap-2 flex-wrap text-sm font-medium">
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/2 flex items-center gap-1">
                                    <Image src="/blood.png" alt="blood" width={16} height={16} />
                                    <span className="">A+</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/2 flex items-center gap-1">
                                    <Image src="/date.png" alt="blood" width={16} height={16} />
                                    <span className="">April 1980</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/2 flex items-center gap-1">
                                    <Image src="/mail.png" alt="blood" width={16} height={16} />
                                    <span className="">pankaj28.com@gmail.com</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/2 flex items-center gap-1">
                                    <Image src="/phone.png" alt="blood" width={16} height={16} />
                                    <span className="">+91 96046 45777</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SMALL CARDS */}
                    <div className="flex-1 flex gap-2 justify-between flex-wrap text-black">
                        <div className="bg-p200 dark:bg-p800 p-2 rounded-md flex gap-2 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] md:p-4 md:gap-4 shadow-md">
                            <Image src="/singleAttendance.png" alt='Single Attendance' width={24} height={24} className="w-6 h-6" />
                            <div className="">
                                <h1 className="text-xl font-semibold">90%</h1>
                                <p className="text-sm text-p700 dark:text-p100">Attendance</p>
                            </div>
                        </div>
                        <div className="bg-p200 dark:bg-p800 p-2 rounded-md flex gap-2 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] md:p-4 md:gap-4 shadow-md">
                            <Image src="/singleBranch.png" alt='Single Branch' width={24} height={24} className="w-6 h-6" />
                            <div className="">
                                <h1 className="text-xl font-semibold">2</h1>
                                <p className="text-sm text-p700 dark:text-p100">Branches</p>
                            </div>
                        </div>
                        <div className="bg-p200 dark:bg-p800 p-2 rounded-md flex gap-2 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] md:p-4 md:gap-4 shadow-md">
                            <Image src="/singleLesson.png" alt='Single Lesson' width={24} height={24} className="w-6 h-6" />
                            <div className="">
                                <h1 className="text-xl font-semibold">8</h1>
                                <p className="text-sm text-p700 dark:text-p100">Lessons</p>
                            </div>
                        </div>
                        <div className="bg-p200 dark:bg-p800 p-2 rounded-md flex gap-2 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] md:p-4 md:gap-4 shadow-md">
                            <Image src="/singleClass.png" alt='Single Class' width={24} height={24} className="w-6 h-6" />
                            <div className="">
                                <h1 className="text-xl font-semibold">9</h1>
                                <p className="text-sm text-p700 dark:text-p100">Classes</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 bg-p200 dark:bg-p800 text-black rounded-md p-4 h-[800px] shadow-md">
                <div className='flex justify-between items-center'>
                    <h1 className="font-semibold text-xl text-p600">Teacher&apos;s Schedule</h1>
                    <Image src={isDarkMode ? "/more.png" : "/moreDark.png"} alt="more" width={20} height={20} />
                    </div>
                    <BigCalendar />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
                <div className="bg-p200 p-4 rounded-md shadow-md">
                    <div className='flex justify-between items-center'>
                        <h1 className="text-xl font-semibold text-p600">Shortcuts</h1>
                        <Image src={isDarkMode ? "/more.png" : "/moreDark.png"} alt="more" width={20} height={20} />
                    </div>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs ">
                        <Link href="/" className="p-3 rounded-md shadow-md bg-p100">Teacher&apos;s Classes</Link>
                        <Link href="/" className="p-3 rounded-md shadow-md bg-p300">Teacher&apos;s Students</Link>
                        <Link href="/" className="p-3 rounded-md shadow-md bg-p400">Teacher&apos;s Lessons</Link>
                        <Link href="/" className="p-3 rounded-md shadow-md bg-p500">Teacher&apos;s Exams</Link>
                        <Link href="/" className="p-3 rounded-md shadow-md bg-p600">Teacher&apos;s Assignments</Link>
                    </div>
                </div>
                <Performance />
                <Announcements />
            </div>
        </div>
    );
}

export default SingleSubjectPage;

