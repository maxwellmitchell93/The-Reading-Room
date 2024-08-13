import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Spinner from './assets/components/home/Spinner'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center space-x-4">
        <a href="https://vitejs.dev" target="_blank" className="p-4">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="p-4">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center mt-8">Vite + React</h1>
      <div className="card p-8 bg-gray-100 rounded-lg shadow-md">
      </div>
      <p className="read-the-docs text-center mt-8">
        Click on the Vite and React logos to learn more
      </p>
      
      <Spinner />
    </>
  );
}

export default App;
