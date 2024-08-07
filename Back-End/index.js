import  express  from "express";
import { PORT, mongoDBURL } from "/.config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import { booksRoute } from "booksRoute.js";

const app = express();

app.use(express.json());

app.get('/', (request response) => {
console.log(request)
return response.status(234).send('connection success');
});



//mongoose connection draft
//still needs connection url
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    });
    .catch((error) => {
        console.log(error);
    });