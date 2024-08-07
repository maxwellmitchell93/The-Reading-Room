import express, { response } from "express";

import { PORT } from "./config.js";

const app = express ();
//http request
app.get('/', (request, response) => {
    console.log(request)
    return response.status (234).send('Welcome to The Reading Room');
});

app.listen(PORT, () => {
    console.log (`app is listening on ${PORT}`);
});