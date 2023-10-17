import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import Header from './components/Layout/Header';
import RootLayout from './components/Root';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Item from './components/Items/Items';
import Dashboard from './components/Dashboard/Dashboard';
import Table from './components/Dashboard/itempage/Table';
import ErrorPage from './pages/Error';
import AuthForm from './components/AuthForm';
import AuthenticationPage, {action as authAction} from './pages/Authentication';




const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage/>,
    children: [
      { path: '/', element: <Header /> },
      { 
        path: 'dashboard', 
        element: <Dashboard />, 
        children : [
          {
            path: 'itemPage',
            index: true,
            element: <Table/>
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthenticationPage />, 
        action: authAction
      },
    ],
  } 
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
