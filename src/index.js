import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './App';
import AddNote from './components/AddNote';
import Error from './components/Error';
import './index.css';
import DashBoardNotes from './components/DashBoardNotes';


const router = createBrowserRouter([
    {
      path : "/",
      element : <AppLayout/>,
      errorElement : <Error/>,
      children : [
        {
          path : '/',
          element : <DashBoardNotes/>
        },
        {
          path : '/add_note',
          element : <AddNote/>
        }
      ]
    }
  ])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>)
