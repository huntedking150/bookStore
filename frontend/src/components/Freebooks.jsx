import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import axios from 'axios';

import Cards from './Cards';

function Freebooks() {
  const [book, setBook] = useState([]);
  const [topPicks, setTopPicks] = useState([]);

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

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/book/top-picks'
        ); // New route for top picks
        setTopPicks(response.data);
      } catch (error) {
        console.error('Error fetching top picks:', error);
      }
    };

    fetchTopPicks();
  }, []);

  const filterData = book.filter((data) => data.category === 'Free');
  // const filterData = book.find().sort({ views: -1 }).limit(5);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-2xl text-pink-800 mb-2">
            Our Top Picks
          </h1>
          <p>
            Explore our diverse range of free courses, designed to empower
            learners of all levels with essential knowledge and skills. Start
            your educational journey today with no cost involved!
          </p>
        </div>

        <div id="slider">
          <Slider {...settings}>
            {/* {filterData.map((item) => (
              <Cards item={item} key={item.id} />
            ))} */}

            {topPicks.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Freebooks;
