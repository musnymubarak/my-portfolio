"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
           <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold drop-shadow-lg">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Hello, I&apos;m
            </span>
            <TypeAnimation
              sequence={[
                "Musny Mubarak",
                1000,
                "Web Developer",
                1000,
                "Mobile Developer",
                1000,
                "UI/UX Designer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
          IT Undergraduate | Tech Enthusiast | Full Stack Developer | MERN
          </p>
          <div>
            <Link
              href="/#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 hover:bg-gradient-to-l hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white transition duration-300"
            >
              Hire Me
            </Link>
            <Link
              href="/"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:bg-gradient-to-l hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white mt-3 transition duration-300"
            >
              <span className="block bg-[#121212] hover:bg-[#0e0e0e] rounded-full px-5 py-2">
                Download CV
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
            <br/>
          <div className="rounded-full bg-[#202020] w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] relative border-2 border-primary-500">
            <Image
              src="/images/Musny.png"
              alt="Musny image"
              className="absolute rounded-full object-cover transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={500}
              height={500}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
