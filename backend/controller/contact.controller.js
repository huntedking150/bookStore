import contactModel from '../model/contact.model.js';

export const contact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = new contactModel({
      name,
      email,
      message,
    });
    await newMessage.save();
    res
      .status(201)
      .json({ successMessage: 'Message sent successfully', newMessage });
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: 'Failed to send message', error: error.message });
  }
};
