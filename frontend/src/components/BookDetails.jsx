import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/book/${id}`);
        setBook(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (!book) return <div>Book not found.</div>;

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto   dark:bg-slate-900 dark:text-white fixed top-0 right-0 left-0 z-50">
        <div className="navbar bg-base-100 flex justify-center ">
          <div
            // tabIndex={0}
            // role="button"
            className="btn btn-ghost btn-circle avatar "
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={book.image} />
            </div>
          </div>
          <div className="ml-5">
            <a href="/" className=" btn btn-ghost text-xl text-pink-800">
              पुस्तक वाटिका
            </a>
          </div>
        </div>
        <div className="   h-screen w-screen flex place-content-around">
          <div className="mt-20  mx-20">
            <div className="card bg-base-100 w-80 shadow-xl">
              <figure>
                <img src={book.image} alt="book" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{book.name}</h2>
                <p>{book.title}</p>
              </div>
            </div>
          </div>
          <div className=" mt-16 mx-5 pr-28 ">
            <div className="  mx-auto  p-4 rounded-lg shadow-md">
              <p className="text-amber-800  text-3xl  mb-6">{book.name}</p>
              <p className=" text-2xl">{book.title}</p>
              <p className="text-green-600 text-xl">${book.category}</p>
              <p className=" text-xl">${book.price} on amazon</p>
              <p className="mt-5 text-xl text-pink-700">Description</p>
              <p className="mt-2 overflow-hidden  ">{book.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
