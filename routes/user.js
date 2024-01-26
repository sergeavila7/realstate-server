import express from 'express';
import { signup, confirm } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', signup);
router.get('/confirm/:token', confirm);

export default router;
