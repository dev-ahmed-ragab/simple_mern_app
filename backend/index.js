import express from 'express';
import { mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from './routes/booksRoute.js';
const app = express();

//middleware for parsing request body
app.use(express.json());
app.use(cors('*'));
//middleware for handling cors errors
app.use(
  cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

//routes

app.get('/', (req, res) => {
  return res.status(234).send('welcome to stack');
});
app.use('/books', booksRoute);
//connect to db

mongoose
  .connect(
    'mongodb+srv://ahmed:*****@cluster0.7xtrv.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log(`Server is running on port ${'3000'}`);
    });
  })
  .catch((err) => {
    console.log('err');
  });
