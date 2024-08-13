import React, { useState, useEffect } from 'react';
import './Spinner.css';

const Spinner = () => {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTopBooks();
  }, []);

  const fetchTopBooks = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=trending&maxResults=10'
      );
      const data = await response.json();
      const fetchedBooks = data.items?.map((item) => ({
        title: item.volumeInfo?.title || "Untitled",
        cover: item.volumeInfo?.imageLinks?.thumbnail || 'placeholder.jpg',
      }));
      setBooks(fetchedBooks || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);  // Set to an empty array in case of error
    }
  };

  const nextBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const prevBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
  };

  const getBooksToDisplay = () => {
    const firstIndex = currentIndex;
    const secondIndex = (currentIndex + 1) % books.length;
    const thirdIndex = (currentIndex + 2) % books.length;

    return [books[firstIndex], books[secondIndex], books[thirdIndex]];
  };

  const booksToDisplay = getBooksToDisplay();

  return (
    <div className="spinner-container">
      <button onClick={prevBook} className="spinner-button">
        ◀
      </button>
      <div className="spinner-slide">
        {booksToDisplay.length > 0 ? (
          booksToDisplay.map((book, index) => (
            book && book.cover ? (
              <img
                key={index}
                src={book.cover}
                alt={book.title}
                className="book-cover"
              />
            ) : (
              <p key={index}>Cover not available</p>
            )
          ))
        ) : (
          <p>Loading books...</p>
        )}
      </div>
      <button onClick={nextBook} className="spinner-button">
        ▶
      </button>
    </div>
  );
};

export default Spinner;
