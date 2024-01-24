import express from 'express';
import user from './routes/user.js';

const app = express();

app.use('/', user);

const port = 4000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
