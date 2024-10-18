'use client';
import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/global/header';
import DarkModeLogo from '@/public/DarkModeLogo.png'; // Dark mode logo
import LightModeLogo from '@/public/LightModeLogo.png'; // Light mode logo
import Link from 'next/link';
import GoBackButton from '@/components/ui/GoBackButton';
import { useTheme } from 'next-themes';

const Custom404: React.FC = () => {
    const { resolvedTheme } = useTheme(); // Use resolvedTheme to check the current theme

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black dark:bg-[#030712] dark:text-white">
                <div className="flex items-center justify-between w-4/5 max-w-xl">
                    <div className="text-9xl font-bold text-gray-800 dark:text-white">4</div>
                    <Image
                        src={resolvedTheme === 'dark' ? DarkModeLogo : LightModeLogo} // Use resolvedTheme
                        alt="Theme Specific Image"
                        width={200}
                        height={200}
                        className="rounded-full object-cover z-100"
                    />
                    <div className="text-9xl font-bold text-gray-800 dark:text-white">4</div>
                </div>
                <p className="text-center my-5 text-lg text-gray-700 dark:text-gray-300">
                    The link is broken, please navigate to the following pages :
                </p>

                <nav className="flex items-center justify-center flex-wrap gap-4 my-8">
                    <div className="flex items-center">
                        <Link href="/" className="font-bold hover:underline text-gray-800 dark:text-white">Home</Link>
                        <span className="border-l h-8 mx-4 border-gray-800 dark:border-white"></span>
                        <Link href="/snippets" className="font-bold hover:underline text-gray-800 dark:text-white">Snippet</Link>
                        <span className="border-l h-8 mx-4 border-gray-800 dark:border-white"></span>
                        <Link href="/addsnippets" className="font-bold hover:underline text-gray-800 dark:text-white">Add Snippet</Link>
                        <span className="border-l h-8 mx-4 border-gray-800 dark:border-white"></span>
                        <Link href="/docs" className="font-bold hover:underline text-gray-800 dark:text-white">Documentation</Link>
                    </div>
                </nav>

                <GoBackButton />
            </div>
        </>
    );
};

export default Custom404;
