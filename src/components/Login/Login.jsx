/* eslint-disable react/no-unknown-property */

import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import app from "../../Firebase/Firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

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

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const loggedUser = result.user;
          console.log(loggedUser)
          setSuccess('User login successful');
          setError('');
        })
        .catch(error => {
          setError(error.message);
        })
    }

    const handleResetPassword = () => {
      const email = emailRef.current.value;
      if(!email){
        alert('Please provide your email address to reset password');
        return; 
      }
      sendPasswordResetEmail(auth, email)
      .then( () => {
        alert('Please check your email');
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      })
    }
    
  return (
    <div className="w-50 mx-auto">
      <form onSubmit={handleLogin}>
        <div className="form-group mb-4">
          <input
            type="email"
            className="form-control"
            name="email"
            ref={emailRef}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group mb-4">
          <input
            type="password"
            className="form-control"
            name="password"
            id="exampleInputPassword1"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p><small>Forget Password? Please <button onClick={handleResetPassword} className="btn btn-link">Reset Password</button></small></p>
      <p><small>New to this website? Please <Link to="/register">Register</Link></small></p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
