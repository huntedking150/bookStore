import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Logout from './Logout';
import Login from './Login';
import { useAuth } from '../context/AuthProvider';

const Navbar = () => {
  const [authUser, setAuthUser] = useAuth();
  const [sticky, setSticky] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const bodyRef = useRef(document.body);

  useEffect(() => {
    const element = document.documentElement;

    if (theme === 'dark') {
      element.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      bodyRef.current.classList.add('dark');
    } else {
      element.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      bodyRef.current.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/books/search?q=${query}`
      );
      setResults(response.data);
    } catch (error) {
      console.error('There was an error fetching the search results!', error);
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission
      handleSearch();
    }
  };

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setQuery(value);

    try {
      const response = await axios.get(
        `http://localhost:4000/books/suggest?q=${value}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error('There was an error fetching suggestions!', error);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const navItems = (
    <>
      <li key="home">
        <a href="/">Home</a>
      </li>
      <li key="course">
        <a href="/course">Course</a>
      </li>
      <li key="contact">
        <a href="/contact">Contact</a>
      </li>
      <li key="about">
        <a href="/about">About</a>
      </li>
      <li key="darkmode" className="lg:hidden">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            value="synthwave"
          />
          <svg
            className="swap-off h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,6a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM16.36,17A1,1,0,0,0,17,16.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-on h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,6.05,6.05,0,0,1-3.37.73A6.15,6.15,0,0,1,9.06,5.49a6.59,6.59,0,0,1,.25-2A1,1,0,0,0,6,2.36,6.14,6.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A6.14,6.14,0,0,1,7.06,5.22v.27A10.15,6.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A6.11,6.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </li>
      <li key="login" className="lg:hidden">
        <a
          className="btn btn-ghost bg-black text-white px-3 py-3 hover:bg-slate-600 duration-300"
          // onClick={() => document.getElementById('my_modal_3').showModal()}
        >
          Login
        </a>
        {/* <Login /> */}
      </li>
    </>
  );

  return (
    <>
      <div
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white fixed top-0 right-0 left-0 z-50
          ${
            sticky
              ? 'sticky-navbar shadow-md bg-base-200 dark:bg-slate-700 dark:text-white duration-300 transition-all ease-in-out'
              : ''
          }`}
      >
        <div className="navbar bg-base-200">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h6m-6 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navItems}
              </ul>
            </div>
            <a href="/" className="btn btn-ghost text-3xl cursor-pointer">
              bookStore
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
              <div className="hidden md:block relative">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={query}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  <button onClick={handleSearch}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </label>

                {isInputFocused && suggestions.length > 0 && (
                  <div className="autocomplete absolute bg-white mt-2 w-full rounded-full shadow-lg z-10">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item p-2 cursor-pointer hover:bg-pink-500 bg-slate-900"
                        onClick={() => setQuery(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
                {results.length > 0 && (
                  <div className="search-results mt-1 bg-white rounded-md shadow-lg absolute z-10">
                    <ul>
                      {results.map((result) => (
                        <li key={result.id} className="p-2">
                          {result.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <label className="swap swap-rotate ml-5">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="synthwave"
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-7 w-7 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,6a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM16.36,17A1,1,0,0,0,17,16.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-7 w-7 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,6.05,6.05,0,0,1-3.37.73A6.15,6.15,0,0,1,9.06,5.49a6.59,6.59,0,0,1,.25-2A1,1,0,0,0,6,2.36,6.14,6.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A6.14,6.14,0,0,1,7.06,5.22v.27A10.15,6.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A6.11,6.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
              {authUser ? (
                <Logout />
              ) : (
                <div>
                  <a
                    className="btn btn-ghost bg-black text-white border-box pt-4 hover:bg-slate-600 duration-300 ml-5 hidden lg:block"
                    onClick={() =>
                      document.getElementById('my_modal_3').showModal()
                    }
                  >
                    Login
                  </a>
                  <Login />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
