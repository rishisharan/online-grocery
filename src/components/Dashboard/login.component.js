import React, { Component, useRef, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

import { withRouter } from '../common/with-router';

const isEmpty = value => value.trim() === '';

const Login = (props) => {

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const [formInputsValidity, setFormInputsValidity] = useState({
    username: true,
    password: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const submitHandler = async(event) => {
    event.preventDefault();
    const enteredUserName = usernameInputRef.current.value;
   
    const enteredPassword = passwordInputRef.current.value;
    const enteredUserNameIsValid = !isEmpty(enteredUserName);
    const enteredPasswordIsValid = !isEmpty(enteredPassword);

    setFormInputsValidity({
      username: enteredUserNameIsValid,
      password: enteredPasswordIsValid
    });

    const isFormValid = enteredUserNameIsValid && enteredPasswordIsValid;

    if(!isFormValid) {
      return;
    }

    const response = await fetch(
      "http://localhost:8080/api/auth/signin",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          username: enteredUserName,
          password: enteredPassword,
        }),
      }
    ).then(response => {
      if(response.status === 200) {
 
      }
    }).catch((error) => {
      setIsError(true);
    });
    setIsSubmitSuccess(true);
    setIsSubmitting(false);
    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem('token', token);
    
  }

  return (
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" ref={usernameInputRef}  className={`form-control ${!formInputsValidity.username ? 'is-invalid' : ''}`}   style={{ width: '30%' }}></input>
            {!formInputsValidity.username && <p className="invalid-feedback">Please enter a valid username!</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" ref={passwordInputRef} className={`form-control ${!formInputsValidity.password ? 'is-invalid' : ''}`} style={{ width: '30%' }}></input>
            {!formInputsValidity.password && <p className="invalid-feedback">Please enter a valid password!</p>}
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    
  );
};
export default Login;