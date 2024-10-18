"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
const GoBackButton = () => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };
  return (
    <button
    className="bg-[#030712] border border-white text-white py-2 px-6 text-lg rounded-md transition-colors hover:bg-white hover:text-black hover:border-black"
    onClick={goBack}
>
    Go Back
</button>
  )
}

export default GoBackButton