import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// pages
import ChatPage from './pages/chatpage';
import HomePage from './pages/homepage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/chat/:chatId",
    element: <ChatPage />,
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
