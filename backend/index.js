import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoute from './routes/book.route.js';
import userRoute from './routes/user.route.js';
import contactRoute from './routes/contact.routes.js';
import searchRoute from './routes/search.routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const PORT = process.env.PORT || 4001;
const URI = process.env.mongoDbURI;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

try {
  mongoose.connect(URI);
  console.log('MongoDb connected successfully.');
} catch (error) {
  console.log('Error connecting to MongoDb', error);
}

app.use('/book', bookRoute);
app.use('/user', userRoute);
app.use('/contact', contactRoute);
app.use('/books', searchRoute);

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
