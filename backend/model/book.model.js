import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  title: String,
  price: Number,
  image: String,
  pdfFile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PDF',
  },
  description: String,
  views: { type: Number, default: 0 },
});

const bookModel = mongoose.model('books', bookSchema);

export default bookModel;
