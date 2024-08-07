import React from 'react';
import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { BookProvider } from './context/bookContext';

const App = () => {
  return (
    <BookProvider>
      <RouterProvider router={router} />
    </BookProvider>
  );
}

export default App;
