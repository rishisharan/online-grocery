import logo from './logo.svg';
import './App.css';
import { Fragment, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Header from './components/Layout/Header';
import RootLayout from './components/Root';
import Item from './components/Items/Items';
import Dashboard from './components/Dashboard/Dashboard.component';
import Table from './components/Dashboard/itempage/Table';
import Register from './components/Dashboard/register.component';
import BoardModerator from './components/auth/board-moderator.component';
import BoardUser from './components/auth/board-user.component';
import Home from './components/Dashboard/home.component';
import BoardAdmin from './components/auth/board-user.component';
import Profile from './components/Dashboard/profile.component';
import Login from './components/Dashboard/login.component';



function App() {
  
  const [currentUser, setCurrentUser] = useState(false); 
  const [showAdminBoard, setShowAdminBoard] = useState(false); 
  const [showModeratorBoard, setShowModeratorBoard] = useState(false); 

  return ( 
    <Fragment>
         <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Online grocery
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

     
      <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/home" element={<Header />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
    </Fragment>);
}

export default App;
