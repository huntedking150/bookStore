import Book from '../model/book.model.js';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { fileURLToPath } from 'url';

// Utility to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize GridFS
const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('pdfs');
});

// Upload Book PDF
export const uploadBookPDF = async (req, res) => {
  try {
    const { originalname, filename, mimetype } = req.file;

    const writestream = gfs.createWriteStream({
      filename: originalname,
      content_type: mimetype,
    });

    fs.createReadStream(path.join(__dirname, '../uploads/', filename)).pipe(
      writestream
    );

    writestream.on('close', async (file) => {
      const book = new Book({
        id: req.body.id, // Ensure id is set here
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        pdfFile: file._id,
      });

      await book.save();
      res.json(book);
    });

    writestream.on('error', (error) => {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Error uploading file' });
    });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get Book Details
export const getBookDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findOne({ id }).populate('pdfFile'); // Populate pdfFile to get PDF details
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get All Books
export const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
