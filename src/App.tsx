import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// pages
import ChatPage from './pages/chatpage';
import HomePage from './pages/homepage';
import Category from './pages/categories';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/chat/:chatId",
    element: <ChatPage />,
  },
  {
    path: "/category/:categoryId",
    element: <Category />,
  },
]);

function App() {
  
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
