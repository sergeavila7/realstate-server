import express from 'express';
import {
  signup,
  confirm,
  resetPassword,
  checkToken,
  newPassword,
} from '../controllers/user.js';

const router = express.Router();

router.post('/signup', signup);
router.get('/confirm/:token', confirm);
router.post('/recovery', resetPassword);

router.get('/recovery/:token', checkToken);
router.post('/recovery/:token', newPassword);

export default router;
