import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookmodels.js';

const app = express();

//Middleware for parsing request body
app.use(express.json());

// initial http request
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to The Reading Room');
});
// Route to save book
app.post('/books', async (request, response) => {
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
app.get('/books', async (request, response) => {
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

app.get('/books/:id', async (request, response) => {
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
app.put('/books/:id', async (request, response) => {
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

        if (!result){
            return response.status(404).json({ messege: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book successfully updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Delete Book Route


// mongo db connection
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to The-Reading-Room database.');
        app.listen(PORT, () => {
            console.log(`app is listening on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
