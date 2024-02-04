import React from 'react'
import './SignIn2.css'
import { Link } from 'react-router-dom';


const SignIn2 = () => {
  return (
    <div className='sign-in-two'>
      <div className="sign-in-wrap">
        <div className="sign-in-header">
            <img src="../images/upup.png" alt="" />
            <p> receive on ease </p>
            <h3> Welcome back! </h3>
        </div>
        <div className="form-wrapper-two">
            <div className="input-field-two">
              <label htmlFor="idNum"> ID Number </label>
              <input type="text" className="idNum" placeholder='your student number' id="idNum" required />     
            </div>
            <div className="input-field-two">
              <label htmlFor="password"> Password </label>
              <input type="password" className="password" placeholder='enter password' id="password" required />
            </div>
        </div>
        <Link to="/student/home">
          <button type="submit" className="sign-up-btn"> Sign In </button>
        </Link>
        <div className="dhave-account-two">
            <p>Don’t have an account?<Link to="/student/sign-up"> <span> SIGN UP! </span> </Link> </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn2
