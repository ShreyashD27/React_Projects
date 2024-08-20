import React from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
    const initialValues = { name: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        setIsSubmit(true);
    
        // Check if there are no errors before making the API call
        if (Object.keys(errors).length === 0) {
            axios.post('http://localhost:8083/signup', formValues)
                .then(res => {
                    navigate('/login');
                    console.log("Data added");

                })
                .catch((err) => console.log(err));
        }
    };
    
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "Name is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };

    return (
        <div className="addUser">
            <h3>Sign Up</h3>
            <form className="addUserForm" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="off"
                        value={formValues.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                    <div className='error'>
                        <p>{formErrors.name}</p>
                    </div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="text"
                        name="email"
                        autoComplete="off"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Enter your Email"
                    />
                    <div className='error'>
                        <p>{formErrors.email}</p>
                    </div>
                    <label htmlFor="Password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        value={formValues.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                    />
                    <div className='error'>
                        <p>{formErrors.password}</p>
                    </div>
                    <button type="submit" className="btn btn-success">
                        Sign Up
                    </button>
                </div>
            </form>
            <div className="login">
                <p>Already have an Account? </p>
                <Link to="/login" type="submit" className="btn btn-primary">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
