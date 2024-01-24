import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
  res.json({ msg: 'Hola mundo en express' });
});

router.get('/users', function (req, res) {
  res.send({ msg: 'Hola mundo en expraess' });
});

export default router;
