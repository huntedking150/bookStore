import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/contact', data);
      setSuccessMessage('Message sent successfully!');
      toast.success('Message send successfully.');
      setErrorMessage('');
      setName('');
      setEmail('');
      setMessage('');
      handleClose();
    } catch (error) {
      setErrorMessage('Error sending message.');
      setSuccessMessage('');
      toast.error('Sending message failed.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      const data = {
        name,
        email,
        message,
      };
      onSubmit(data);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="modal-box">
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
          <h3 className="font-bold text-2xl">Contact Us</h3>
          <div className="mb-3">
            {successMessage && (
              <div className="text-green-500">{successMessage}</div>
            )}
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div className="mt-5">
              <span>Name</span>
              <label className="input input-bordered flex items-center gap-2 mt-1">
                <span>Name</span>
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="mt-5">
              <span>Email</span>
              <label className="input input-bordered flex items-center gap-2 mt-1">
                <span>Email</span>
                <input
                  type="email"
                  className="grow"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="mt-5 ">
              <span className="px-2">Message</span>
              <div>
                <Box
                  component="form"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiTextField-root': {
                      m: 1,
                      width: 'calc(100% - 16px)',
                      '& .MuiInputBase-input': {
                        color: 'white',
                        '&::placeholder': {
                          color: 'white',
                          opacity: 0.7,
                        },
                      },
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label=""
                      multiline
                      rows={4}
                      placeholder="Enter your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      sx={{
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'white',
                          },
                          '&:hover fieldset': {
                            borderColor: 'white',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'white',
                          },
                        },
                      }}
                    />
                  </div>
                </Box>
              </div>
            </div>
            <div className="mt-5 px-3">
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
