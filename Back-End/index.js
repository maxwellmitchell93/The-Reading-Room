import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';

const app = express();
//http request
app.get('/',(request, response) => {
    console.log(request)
    return response.status (234).send('Welcome to The Reading Room.')
});


//mongoose connection
mongoose
 .connect(mongoDBURL)
 .then(() => {
console.log('App is connected to the database.');
//port setup connection
app.listen(PORT, () => {
    console.log (`Listening on port: ${PORT}`);
    });
 })
 .catch((error) => {
    console.log(error);

 });