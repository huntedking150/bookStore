import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

const Signup = () => {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmits = async (data) => {
    const { name, email, password } = data;
    try {
      const response = await axios.post('http://localhost:4000/user/register', {
        fullname: name,
        email,
        password,
      });
      console.log('User registered successfully:', response.data);
      toast.success('SignUp successful');

      if (from === '/course') {
        document.getElementById('my_modal_3').showModal();
      } else {
        navigate('/');
      }

      // navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorFromSubmit(
        'User already exits. Please try again with another email.'
      );
      toast.error('User already exists.');
    }
  };

  const closeModal = () => {
    navigate('/');
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="modal-box">
          <form onSubmit={handleSubmit(handleSubmits)}>
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-2xl">Sign Up</h3>
            <div className="mb-3">
              <div className="mt-5">
                <span>Name</span>
                <label className="input input-bordered flex items-center gap-2 mt-1">
                  <span>Name</span>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Enter full name"
                    {...register('name', { required: true })}
                  />
                </label>
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
              <div className="mt-5">
                <span>Email</span>
                <label className="input input-bordered flex items-center gap-2 mt-1">
                  <span>Email</span>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Enter your email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                </label>
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="mt-5">
                <span>Password</span>
                <label className="input input-bordered flex items-center gap-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    className="grow"
                    placeholder="Enter password"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                </label>
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="btn btn-neutral bg-amber-700 rounded-full"
                >
                  Sign Up
                </button>
                <button
                  onClick={() =>
                    document.getElementById('my_modal_3').showModal()
                  }
                  className="mt-2 cursor-pointer block"
                >
                  Already Registered? Login
                </button>
                {errorFromSubmit && (
                  <span className="text-red-500">{errorFromSubmit}</span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <Login />
    </>
  );
};

export default Signup;
