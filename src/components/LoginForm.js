import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import styles from "../stylesheets/LoginForm.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { changeDetails } from '../redux/userReducer'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'


function LoginForm() {

  const dispatch = useDispatch()
  const details = useSelector((state) => state.user)

  const [logged, setLogged] = useState(false)
  const loginwithJWT = async (credentialResponse) => {
    await fetch('http://localhost:4000/fetchUser/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentialResponse.email })
    }).then(async res => {
      return res.json()
    }).then(data => {

      if (data) {
        dispatch({
          type: `${changeDetails}`,
          payload: {
            ...data
          }
        })
        setLogged(true)
      } else {
        alert("Login Failed")
      }
    })
  }

  const loginWithCredientials = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:4000/fetchUser/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: details.email, password: details.password })
    }).then(async res => {
      return res.json()
    }).then(data => {
      if (data) {
        dispatch({
          type: `${changeDetails}`,
          payload: {
            ...data
          }
        })
        setLogged(true)
      } else {
        alert("Login Failed")
      }
    })
  }

  const updateUsername = (e) => {
    dispatch({
      type: `${changeDetails}`,
      payload: {
        [e.target.name]: e.target.value
      }
    })
  }


  if (logged) {
    return <Navigate replace to={"/chatPage"} /> // Redirect to home page
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <h1>Welcome Back</h1>
        <p>Please login to your account</p>
        <div className={styles.inputGroup}>
          <input onChange={updateUsername} value={details.email} type="text" id="username" name="email" placeholder="Email" required />
        </div>
        <div className={styles.inputGroup}>
          <input onChange={updateUsername} type="password" id="password" name="password" placeholder="Password" />
        </div>
        <button type="submit" onClick={loginWithCredientials} >Login</button>
        <div className={styles.bottomtext}>
          <p>Don't have an account? <Link to={"/signup"}>Sign Up</Link></p>
          <p><a href="/">Forgot password?</a></p>
        </div>
        <div className={styles.authDiv}>

          <GoogleLogin
            shape='pill'
            size='medium'
            onSuccess={credentialResponse => {
              loginwithJWT(jwtDecode(credentialResponse.credential))
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
