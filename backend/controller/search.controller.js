import bookModel from '../model/book.model.js';

// Controller function for handling search
export const searchBooks = async (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  const query = q.toLowerCase();

  try {
    const results = await bookModel
      .find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      })
      .select('name title id description')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await bookModel.countDocuments({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    res.json({
      results,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
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
        name: { $regex: query, $options: 'i' },
      })
      .select('name id')
      .limit(10); // Limit the number of suggestions

    const suggestionData = suggestions.map((book) => ({
      id: book.id,
      name: book.name,
    }));
    res.json(suggestionData);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
