import express from 'express';
import {
  formLogin,
  formRecovery,
  formSignup,
  signup,
} from '../controllers/user.js';

const router = express.Router();

router.get('/login', formLogin);
router.get('/signup', formSignup);
router.post('/signup', signup);
router.get('/recovery', formRecovery);

export default router;
