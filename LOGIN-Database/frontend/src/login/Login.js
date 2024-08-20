import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const initialValues = { email: "", password: "" };
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
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if (!formErrors.email && !formErrors.password) {
            axios.post('http://localhost:8083/login', formValues)
                .then(res => {
                    if (res.data === "Success") {
                        navigate('/');
                        console.log("Login successfull !!!");

                    } else {
                        console.log("Login Failed");
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const validate = (values) => {
        const errors = {};
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
            <h3>Sign in</h3>
            <form className="addUserForm" onSubmit={handleSubmit}>
                <div className="inputGroup">
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
                        placeholder="Enter your Password"
                    />
                    <div className='error'>
                        <p>{formErrors.password}</p>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </div>
            </form>
            <div className="login">
                <p>Don't have Account? </p>
                <Link to="/" type="submit" className="btn btn-success">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;
