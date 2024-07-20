"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image"; 

const Footer = () => {
  return (
    <footer className="footer border-t border-[#33353F] text-white bg-[#121212]">
      <div className="container mx-auto p-6 flex flex-col items-center justify-center text-center">
        <Link href={"/"} className="flex items-center justify-center">
          <Image 
            src="/images/logo.png" 
            alt="Logo" 
            width={100} 
            height={100} 
            className="w-24 h-auto mb-4" // Added margin-bottom
          />
        </Link>
        <p className="text-xs md:text-base text-slate-500 break-words">
          Copyright © 2024 MusnyMubarak | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
