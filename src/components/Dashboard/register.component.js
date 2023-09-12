
import Form from "react-validation/build/form";
import AuthService from "../../services/auth.service";
import Input from "react-validation/build/input";
import React, { Component, useRef, useState } from "react";
import CheckButton from "react-validation/build/button";

const isEmpty = value => value.trim() === '';

const Register = (props) => { 

  const [formInputsValidity, setFormInputsValidity] = useState({
    username: true,
    email: true,
    password: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUsernameDuplicate, setisUsernameDuplicate] = useState(false);
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (event) => { 
    event.preventDefault();
    const enteredUserName = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredUserNameIsValid = !isEmpty(enteredUserName);
    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredPasswordIsValid = !isEmpty(enteredPassword);

    setFormInputsValidity({
      username: enteredUserNameIsValid,
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid
    })

    const isFormValid = enteredUserNameIsValid && enteredEmailIsValid && enteredPasswordIsValid;

    if (!isFormValid) {
      return;
    }

  
    const response = await fetch(
      "http://localhost:8080/api/auth/signup",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          username: enteredUserName,
          email: enteredEmail,
          password: enteredPassword,
        }),
      }
    ).then(response => {
      console.log('Response code', response.status);
      if (response.status === 400) {
        setisUsernameDuplicate(true);
      }
    }).catch((error) => {
      console.log('Error');
      setIsError(true);
    });
    setIsSubmitSuccess(true);
    setIsSubmitting(false);
  
    if (isSubmitSuccess) {
      usernameInputRef.current.value = '';
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
      setisUsernameDuplicate(false);
    }

  };

  return (
    <div className="container">
      {/* Error banner */}
      <div>
        {isSubmitSuccess && !isUsernameDuplicate && (
          <div className="alert alert-success mt-3">
            <p>Registeration success.</p>
          </div>
        )}
        {isError && (
          <div className="alert alert-danger mt-3">
            <p>Something went wrong.</p>
          </div>
        )}
        {isUsernameDuplicate && (
          <div className="alert alert-info mt-3">
            <p>Error: Username is already taken!.</p>
          </div>
        )}

      </div>
      
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={usernameInputRef} className={`form-control ${!formInputsValidity.username ? 'is-invalid' : ''}`}   style={{ width: '30%' }}></input>
          {!formInputsValidity.username && <p className="invalid-feedback">Please enter a valid username!</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" ref={emailInputRef} className={`form-control ${!formInputsValidity.email ? 'is-invalid' : ''}`}   style={{ width: '30%' }}></input>
          {!formInputsValidity.email && <p className="invalid-feedback">Please enter a valid email!</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" ref={passwordInputRef} className={`form-control ${!formInputsValidity.password ? 'is-invalid' : ''}`}   style={{ width: '30%' }}></input>
          {!formInputsValidity.password && <p className="invalid-feedback">Please enter a valid password!</p>}
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
      
    </div>

    
  );
};

export default Register;