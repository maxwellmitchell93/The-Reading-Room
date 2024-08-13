import express from "express";
import { Book } from '../models/bookmodels.js';


const router = express.Router();

// Route to save book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear ||
            !request.body.description ||
            !request.body.genre
        ) {
            return response.status(400).send({
                message: 'Send all required feilds: Genre, Description, PublishDate, Author, Title',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishDate: request.body.publishDate,
            description: request.body.description,
            genre: request.body.genre,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all books from reading room db
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books

        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
// Route to get one book from reading room db by id

router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to update a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear ||
            !request.body.description ||
            !request.body.genre
        ) {
            return response.status(400).send({
                message: 'Send all required feilds: title, author, publishYear, genre, description',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ messege: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book successfully updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Delete Book Route
//todo: test this api

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;