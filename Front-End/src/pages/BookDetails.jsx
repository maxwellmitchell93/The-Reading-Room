// src/pages/BookDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const data = await response.json();
      console.log('Book data:', data); // Log the data to inspect the structure

      const price = data.saleInfo?.retailPrice?.amount;

      const bookDetails = {
        id,
        title: data.volumeInfo?.title || "Untitled",
        cover: data.volumeInfo?.imageLinks?.extraLarge || 
               data.volumeInfo?.imageLinks?.large || 
               data.volumeInfo?.imageLinks?.medium || 
               data.volumeInfo?.imageLinks?.small || 
               data.volumeInfo?.imageLinks?.thumbnail || '/path/to/image-not-available.jpg',
        description: data.volumeInfo?.description || "No description available.",
        price: price !== undefined ? price : 'N/A',  // Handle undefined price
        purchaseLink: data.volumeInfo?.infoLink || '#',
      };
      setBook(bookDetails);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className="book-details-container">
      <img src={book.cover} alt={book.title} className="book-details-cover" />
      <div className="book-details-info">
        <h1>{book.title}</h1>
        <p>{book.description}</p>
        <p className="book-details-price">
          {book.price !== 'N/A' ? `$${Number(book.price).toFixed(2)}` : 'Price not available'}
        </p>
        <button onClick={() => addToCart(book)} className="add-to-cart-button">
          Add to Cart
        </button>
        <a href={book.purchaseLink} target="_blank" rel="noopener noreferrer" className="purchase-link">
          Purchase this book
        </a>
      </div>
    </div>
  );
};

export default BookDetails;
