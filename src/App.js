import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import Header from './components/Layout/Header';
import RootLayout from './components/Root';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Item from './components/Items/Items';
import Dashboard from './components/Dashboard/Dashboard';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      { path: '/items', element: <Item/> },
      { path: '/', element: <Header /> },
      { path: '/dashboard', element: <Dashboard/> },
    ],
  } 
]);

function App() {
  return <RouterProvider router={router}/>;
    // <Fragment>
    //   <Header>
        
    //   </Header>
    // </Fragment>

  //);
}

export default App;
