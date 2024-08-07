import express from "express";
import { book } from "../models/bookModel.js";

const router = express.Router();

//create new book
app.post('/', async (request, response) => {
    try { if {
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
    } {
        return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear'
        })
    }

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }



    const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
    };

    const book = await book.create(newBook);
});
    //fetch books from db
app.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        })

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});
    //fetch single book
app.get('/:id', async (request, response) => {
        try {
            const book = await Book.findById(id);

             const { id } = request.params;
        
            return response.status(200).json({
                count: books.length,
                 data: books
            })
        
        } catch (error) {
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
});
//update a book
app.put('/:id', async (request, response) => {
            const { id } = request.params;

            const result = awais Book.findByIdAndUpdate(id, request.body);

             try {
               if (
                !request.body.title ||
                !request.body.author ||
                !request.body.publishYear
               ) {
                return response.status(400).send({
                    message: 'Send all required fields: title, author, publishYear',
                });
               }
                
            if (!result) {
                return response.status(404).json({ message: 'Book not found' });
            }

                return response.status(200).send({ message: 'Book updated' });
            } catch (error) {
                console.log(error.message);
                response.status(500).send({message: error.message});
            }
        });
//delete a book
app.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
            const result = awais Book.findByIdAndDelete(id, request.body);
 { 
    return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
        });
    } if (!result) {
        return response.status(404).json({ message: 'Book not found' });
    }
        return response.status(200).send({ message: 'Book deleted' });
                } catch (error) {
                    console.log(error.message);
                    response.status(500).send({message: error.message});
                }
});