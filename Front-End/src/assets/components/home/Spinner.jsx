import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Spinner.css';

const Spinner = () => {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopBooks();
  }, []);

  const fetchTopBooks = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=trending&maxResults=10'
      );
      const data = await response.json();
      const fetchedBooks = data.items?.map((item, index) => ({
        id: item.id || index, // Use item.id if available, otherwise fallback to index
        title: item.volumeInfo?.title || "Untitled",
        cover: item.volumeInfo?.imageLinks?.large || 
               item.volumeInfo?.imageLinks?.medium || 
               item.volumeInfo?.imageLinks?.thumbnail || 'placeholder.jpg',
      })) || [];
      setBooks(fetchedBooks);
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

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
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
          booksToDisplay.map((book) => (
            book && book.cover && book.id ? ( // Ensure the book, its cover, and id exist
              <div
                key={book.id}
                className="book-item"
                onClick={() => handleBookClick(book.id)}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="book-cover"
                />
              </div>
            ) : (
              <p key={book?.id || Math.random()}>Book cover not available</p> // Fallback if cover or id is missing
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
