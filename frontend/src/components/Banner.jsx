import React, { useEffect } from 'react';
import banner from '/Banner.png';

const Banner = () => {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex md:flex-row flex-col my-10">
        <div className="order-2 md:order-1 h-full w-full md:w-1/2 ">
          <div className=" mt-28 space-y-8 ">
            <h1 className="text-4xl font-bold">
              Welcome! Discover new insights and learn something
              <span className="text-pink-700"> new everyday!!!</span>
            </h1>

            <p className="text-xl">
              Welcome to our platform dedicated to expanding your knowledge and
              fostering curiosity. Dive into a wealth of resources curated to
              inspire and empower your learning journey. Whether you are here to
              explore cutting-edge technologies, master new skills, or deepen
              your understanding of the world around us, you will find
              everything you need to fuel your passion for continuous growth.
            </p>
            <label className="input input-bordered flex items-center gap-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>
          </div>
          <a href="#slider" className="mt-6 btn btn-secondary ">
            Get Started
          </a>
        </div>
        <div className="order-1 md:order-2 h-full w-full md:w-1/2 flex justify-center  mt-[-50px]">
          <img src="/Banner1.png" className="h-92 h-92" alt="" />
        </div>
      </div>
    </>
  );
};

export default Banner;
