import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoute.js';

const app = express();

//Middleware for parsing request body
app.use(express.json());

// initial http request
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to The Reading Room');
});
app.use('/books', booksRoute);

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
