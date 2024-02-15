import React, { useState, useEffect } from "react";
import "./SignIn2.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useAuth from "../../../auth/useAuth";
import {SignInStudentValidation} from '../../../yup validation/SignInStudentValidation';
import { loginStudent } from "../../../api/loginStudent";


const SignIn2 = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { token, auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    student_id: "",
    password: "",
  };


  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const response = await loginStudent({
        student_id: values.student_id,
        password: values.password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify({ role: "student" }));
        auth(true);
      } else {
        setErrorMessage("An error occurred");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("These credentials do not match our records.");
      } else {
        setErrorMessage("An error occurred");
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    console.log("auth:", auth);

    if (auth) {
      navigate("/student/home");
    }
  }, [auth, navigate]);

  return (
    <div className="sign-in-two">
      <div className="sign-in-wrap">
        <div className="sign-in-header">
          <img src="../images/upup.png" alt="" />
          <p> receive on ease </p>
          <h3> Welcome back! </h3>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={SignInStudentValidation}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="form-wrapper-two">
              <div
                className={`input-field-two ${
                  errors.student_id && touched.student_id ? "error" : ""
                }`}
              >
                <label htmlFor="idNum"> Student ID Number </label>
                <Field
                  type="text"
                  placeholder="Your Student ID Number"
                  id="idNum"
                  name="student_id"
                />
                <ErrorMessage
                  name="student_id"
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
                  placeholder="Enter Your Password"
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="error-message"
                />
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
            <Link to="/student/sign-up">
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
