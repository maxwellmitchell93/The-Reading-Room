import React from "react";
import {Routes, route} from 'react-router-dom'
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
improt DeleteBook from './pages/DeleteBook';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './Apps.css';
import Spinner from './assets/components/home/Spinner'; 

const App = () => {
  <Routes>
    <Route path="/" elemment={<Home />} />
    <Route path="/books/create" element={<CreateBook />} />
    <Route path="/books/details/:id" element={<ShowBook />} />
    <Route path="/books/edit.:id" element={<EditBook />} />
    <Route path="/books/delete/:id" element={<DeleteBook />} />
  </Routes>;
};


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center space-x-4">
        <a href="https://vitejs.dev" target="_blank" className="p-4">
          {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        </a>
        <a href="https://react.dev" target="_blank" className="p-4">
          {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center mt-8">The Reading Room</h1>
      <div className="card p-8 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-1xl font-thin text-float-right">Fiction-Nonfiction-Genres-Search</h3>
      </div>
      <p className="read-the-docs text-center mt-8">
        top 10 books for 2024
      </p>
      
      <Spinner />
    </>
  );
};

export default App;
