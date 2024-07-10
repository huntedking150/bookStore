import React, { useState } from 'react';
import axios from 'axios';

const UploadBook = () => {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    description: '',
    pdfFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('author', formData.author);
    data.append('description', formData.description);
    data.append('pdf', formData.pdfFile);

    try {
      await axios.post('http://localhost:4000/books/upload', data);
      alert('Book uploaded successfully');
    } catch (error) {
      console.error('Error uploading book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="file"
        name="pdfFile"
        accept=".pdf"
        onChange={handleChange}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadBook;
