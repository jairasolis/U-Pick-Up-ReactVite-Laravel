import React, { useState, useEffect } from "react";
import "./SignIn2.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useAuth from "../../../auth/useAuth";
import { SignInAdminValidation } from "../../../yup validation/SignInAdminValidation";
import { loginAdmin } from "../../../api/loginAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'

const SignIn2 = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, auth } = useAuth();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const { username } = values;
    try {
      setLoading(true);
      const response = await loginAdmin({
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        const { token, data } = response.data;
        const id = data.id;

        localStorage.setItem("admin_name", username);
        localStorage.setItem("adminId", id);
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify({ role: "admin" }));
        auth(true);

        console.log
        console.log("authhhhhh:", auth);
      } else {
        setErrorMessage("An error occurred");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("These credentials do not match our records");
      } else {
        setErrorMessage("An error occurred");
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/admin/dashboard");
    }
  }, [auth, navigate]);

  return (
    <div className="sign-in-two">
      <div className="sign-in-wrap">
        <Link to="/">
            <FontAwesomeIcon icon={faCircleLeft} className='forgot-pass-back' />
        </Link>
        <div className="sign-in-header">
          <img src="../images/upup.png" alt="" />
          <p> receive on ease </p>
          <h3> Welcome back! </h3>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={SignInAdminValidation}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="form-wrapper-two">
              <div
                className={`input-field-two ${
                  errors.username && touched.username ? "error" : ""
                }`}
              >
                <label htmlFor="username"> Username </label>
                <Field
                  type="text"
                  className="username"
                  placeholder="Your Username"
                  id="username"
                  name="username"
                  required
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="error-message"
                />
              </div>
              <div
                className={`input-field-two ${
                  errors.password && touched.password ? "error" : ""
                }`}
              >
                <label htmlFor="password"> Password </label>
                <Field
                  type="password"
                  className="password"
                  placeholder="Enter Your Password"
                  id="password"
                  name="password"
                  required
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="error-message"
                />
                <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                  <div className="forgot-pass">
                    <p> Forgot password? </p>
                  </div>
                </Link>
              </div>
              <button
                type="submit"
                className="sign-up-btn"
                disabled={isSubmitting || loading}
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="dhave-account-two">
          <p>
            Don’t have an account?
            <Link to="/admin/sign-up" style={{ textDecoration: "none" }}>
              {" "}
              <span> SIGN UP! </span>{" "}
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn2;
