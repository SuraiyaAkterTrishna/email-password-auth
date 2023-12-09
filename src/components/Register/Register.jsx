/* eslint-disable no-unused-vars */
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../Firebase/Firebase.config";

const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('');
        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(email, password);

        // validate
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

        //create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            setSuccess('User has been created successfully')
        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);
            
        })
    }

    const handleEmailChange = (event) => {
        // setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }
    return (
        <div className="w-50 mx-auto">
            <h2 className="text-primary">Please Register!!!</h2>
            <form onSubmit={handleSubmit}>
                <input className="w-50 mb-4 p-1" onChange={handleEmailChange} type="email" name="email" id="email" placeholder="Your Email" required />
                <br />
                <input className="w-50 mb-4 p-1" onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder="Your Password" required />
                <br />
                <input className="btn btn-primary" type="submit" value="Register" />
            </form>   
            <p className="text-danger">{error}</p>
            <p className="text-success">{success}</p>    
        </div>
    );
};

export default Register;