import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { json, Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

const Login = () => {
  const [authUser, setAuthUser] = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios.post('http://localhost:4000/user/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      setLoginError('');
      closeModal();
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // navigate('/');
      navigate(from);
      toast.success('Login successful');
      closeModal;
      window.location.reload();
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Invalid email or password');
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('my_modal_3');
    if (modal) {
      modal.close();
    }
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-2xl">Login</h3>
            <div className="mb-3">
              <div className="mt-2">
                <span className="my-10">Email</span>
                <label className="input input-bordered flex items-center gap-2 mt-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Email"
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
                  Login
                </button>
                <a href="/signup" className="mt-2 cursor-pointer block">
                  New User? SignUp
                </a>
                {loginError && (
                  <div className="text-red-500 mt-2">{loginError}</div>
                )}
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Login;
