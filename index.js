import express from 'express';
import cors from 'cors';
import user from './routes/user.js';
import db from './config/db.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  await db.authenticate();
  db.sync();
  console.log('Conexion correcta a la BD');
} catch (error) {
  console.log(error);
}

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use('/auth', user);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
