import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './App';
import AddNote from './Component/AddNote';
import Body from './Component/Body';
import Error from './Component/Error';
import './index.css';


const router = createBrowserRouter([
    {
      path : "/",
      element : <AppLayout/>,
      errorElement : <Error/>,
      children : [
        {
          path : '/',
          element : <Body/>
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
