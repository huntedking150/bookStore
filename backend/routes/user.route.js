import express from 'express';
import { registerUser } from '../controller/user.controller.js';
import { loginUser } from '../controller/user.login.controller.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a new user
router.post('/login', loginUser);

export default router;
