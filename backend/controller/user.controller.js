import userModel from '../model/user.model.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Check if user with the same email already exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new userModel({
      fullname,
      email,
      password: hashedPassword,
    });

    // Save new user to database
    await newUser.save();

    // Respond with success message and new user data
    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    // Handle any errors and respond with appropriate status code and error message
    res
      .status(500)
      .json({ message: 'Failed to register user', error: error.message });
  }
};
