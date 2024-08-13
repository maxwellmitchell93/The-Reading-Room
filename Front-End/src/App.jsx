import React from "react";
import {Routes, route} from 'react-router-dom'
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
improt DeleteBook from './pages/DeleteBook';

const App = () => {
  <Routes>
    <Route path="/" elemment={<Home />} />
    <Route path="/books/create" element={<CreateBook />} />
    <Route path="/books/details/:id" element={<ShowBook />} />
    <Route path="/books/edit.:id" element={<EditBook />} />
    <Route path="/books/delete/:id" element={<DeleteBook />} />
  </Routes>;
};

export default App;
