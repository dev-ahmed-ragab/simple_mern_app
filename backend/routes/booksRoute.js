import express from 'express';
import Book from '../models/bookModel.js';
const router = express.Router();

//post request to create a new book
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send('All fields are required');
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).json(book);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//get request to fetch all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

//get request to fetch by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

//put request to update a book
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send('All fields are required');
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send('Book not found');
    }
    return res.status(200).json('book updated');
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

//delete request to delete a book

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send('book not found');
    }
    return res.status(200).json('book deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

export default router;
