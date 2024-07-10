import express from 'express';
import {
  getBook,
  getBookDetails,
  uploadBookPDF,
} from '../controller/book.controller.js';

import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getBook);
router.get('/:id', getBookDetails);
router.post('/upload', upload.single('pdf'), uploadBookPDF);

export default router;
