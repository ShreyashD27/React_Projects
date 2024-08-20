import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
  const initialValues = {email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //const email = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
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
          <div class='error'>
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
            <div class='error'>
          <p>{formErrors.password}</p></div>
          <button type="submit" class="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="login">
        <p>Don't have Account? </p>
        <Link to="/" type="submit" class="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
