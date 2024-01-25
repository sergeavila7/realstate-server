import express from 'express';
import user from './routes/user.js';
import db from './config/db.js';

const app = express();

try {
  await db.authenticate();
  console.log('Conexion correcta a la BD');
} catch (error) {
  console.log(error);
}

app.use('/auth', user);

const port = 4000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
