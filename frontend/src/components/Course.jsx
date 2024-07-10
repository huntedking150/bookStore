import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

import Cards from './Cards';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Course = () => {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get('http://localhost:4000/book');
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching the book data:', error);
      }
    };

    fetchBook();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
        <div className="items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl mt-28 ">
            We are delighted to to have you{' '}
            <span className="text-pink-500"> Here:)</span>
          </h1>
          <p className="mt-5">
            Discover a world of knowledge with our extensive collection of books
            spanning every genre and interest. Enjoy seamless online shopping
            and fast delivery right to your doorstep, bringing your favorite
            reads closer to you. Join our community of book lovers and stay
            updated with the latest releases, exclusive offers, and book club
            events. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quis, nobis?
          </p>
          <div className=" mt-6">
            <Link to="/">
              <button className="btn bg-pink-900 text-white px-8">Back</button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
