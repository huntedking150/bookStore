import React from 'react';

const About = () => {
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-red-700 pb-4">
            About Us
          </h1>
          <p className="font-normal text-base leading-6 text-white ">
            Welcome to our Book Store website! We are a dedicated team of four
            enthusiastic students from the 5th semester of the Computer
            Engineering program at Himalaya College of Engineering (HCOE). Our
            team consists of:
            <ul className="mt-2 mb-4">
              <li>Abhisek Sah</li>
              <li>Yadav Pokhrel</li>
              <li>Manish Shrestha</li>
              <li>Sanandan Ghimire</li>
            </ul>
            Our mission is to create an accessible and user-friendly platform
            for book lovers to search and explore a wide range of books
            available in our database.
          </p>
        </div>
        <div className=" w-full lg:w-8/12 ">
          <img
            className="w-full h-full"
            // src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
            src="/college.jpeg"
            alt="A group of People"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-red-700 pb-4">
            Our Story
          </h1>
          <p className="font-normal text-base leading-6 text-white ">
            As passionate readers and tech enthusiasts, we realized the need for
            a streamlined and efficient way to search for books. Whether it's
            for academic purposes, personal growth, or leisure reading, finding
            the right book can sometimes be a daunting task. This inspired us to
            combine our love for books with our technical skills, and thus, our
            Book Store website was born. During our 5th semester at HCOE, we
            embarked on this journey to develop a comprehensive database-driven
            platform that not only makes book searching easy but also enhances
            the overall user experience.
          </p>
        </div>
        <div className="w-full lg:w-8/12 lg:pt-8">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden"
                src="/Abhisek.jpeg"
                alt="Alexa featured Img"
              />
              <img
                className="md:hidden block"
                src="/Abhisek.jpeg"
                alt="Alexa featured Img"
              />
              <p className="font-medium text-xl leading-5 text-white mt-4">
                Abhisek Sah
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden"
                src="/Yadav.jpg"
                alt="Olivia featured Img"
              />
              <img
                className="md:hidden block"
                src="/Yadav.jpg"
                alt="Olivia featured Img"
              />
              <p className="font-medium text-xl leading-5 text-white mt-4">
                Yadav Pokhrel
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden"
                src="/Sanandan.jpg"
                alt="Liam featued Img"
              />
              <img
                className="md:hidden block"
                src="/Sanandan.jpg"
                alt="Liam featued Img"
              />
              <p className="font-medium text-xl leading-5 text-white mt-4">
                Sanandan
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden"
                src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png"
                alt="Elijah featured img"
              />
              <img
                className="md:hidden block"
                src="https://i.ibb.co/ThZBWxH/Rectangle-121.png"
                alt="Elijah featured img"
              />
              <p className="font-medium text-xl leading-5 text-white mt-4">
                Manish
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
