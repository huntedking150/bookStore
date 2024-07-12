import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Home from './home/Home';
import Courses from './Courses/Courses';
import SignUp from './Signup/Signup';
import Login from './components/Login';
import ContactUs from './Contact/ContactUs';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';
import BookDetails from './components/BookDetails';

import AboutUs from './About/AboutUs';

function App() {
  const [authUser, setAuthUser] = useAuth();
  const location = useLocation();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/course"
            element={
              authUser ? (
                <Courses />
              ) : (
                <Navigate to="/signup" state={{ from: location }} />
              )
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
