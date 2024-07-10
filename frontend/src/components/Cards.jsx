import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Cards({ item }) {
  return (
    <>
      <Link to={`/book/${item.id}`} className="card-link">
        <div className="mt-6 mb-6 p-10">
          <div className="card bg-base-100 w-92 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white">
            <figure>
              <img src={item.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {item.name}
                <div className="badge badge-secondary">{item.category}</div>
              </h2>
              <p>{item.title}</p>
              <div className="card-actions justify-between">
                <div className="badge badge-outline">${item.price}</div>
                {/* <button className="cursor-pointer px-2 py-1 rounded-full border-[1px] hover:bg-pink-500 duration-200 hover:text-white">
                Read Now
              </button> */}
                <Link
                  to={`/book/${item.id}`}
                  className="cursor-pointer px-2 py-1 rounded-full border-[1px] hover:bg-pink-500 duration-200 hover:text-white"
                >
                  Read Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
Cards.propTypes = {
  item: PropTypes.object.isRequired, // Adjust the type based on your use case
};

export default Cards;
