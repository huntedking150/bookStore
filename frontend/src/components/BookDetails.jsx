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
    <div className="flex justify-center items-center h-screen w-screen">
      <div>
        <h1>Name:{book.name}</h1>
        <p>Title: {book.title}</p>
        <p>Category:{book.category}</p>
        <p>image:{book.image}</p>
        <p>price:{book.price}</p>
        <a
          href={`http://localhost:4000/pdf/${book.pdfFile}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View PDF
        </a>
      </div>
    </div>
  );
};

export default BookDetails;
