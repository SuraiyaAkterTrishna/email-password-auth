/* eslint-disable react/no-unknown-property */

import { useState } from "react";

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        // validate 
        setError('');
        setSuccess('');
        if(!/(?=.*[A-Z])/.test(password)){
          setError('Please add at least one uppercase');
          return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
          setError('Please add at least two digits');
          return;
        }
        else if(password.length < 6){
          setError('Please add at least 6 characters in your password');
          return;
        }
    }
    
  return (
    <div className="w-50 mx-auto">
      <form onSubmit={handleLogin}>
        <div className="form-group mb-4">
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            name="password"
            id="exampleInputPassword1"
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
