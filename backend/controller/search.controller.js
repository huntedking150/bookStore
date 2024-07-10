import bookModel from '../model/book.model.js';

// Controller function for handling search
export const searchBooks = async (req, res) => {
  const query = req.query.q.toLowerCase();

  try {
    const results = await bookModel.find({
      name: { $regex: query, $options: 'i' }, // Case-insensitive regex search
    });
    res.json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const suggestBooks = async (req, res) => {
  const query = req.query.q.toLowerCase();

  try {
    const suggestions = await bookModel
      .find({
        name: { $regex: query, $options: 'i' }, // Case-insensitive regex search
      })
      .select('name');

    const suggestionTitles = suggestions.map((book) => book.name);
    res.json(suggestionTitles);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
