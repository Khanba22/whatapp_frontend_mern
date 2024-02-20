import React from 'react'
import {Link} from 'react-router-dom'
import styles from "../stylesheets/LoginForm.module.css"
import { useDispatch } from 'react-redux'
import { changeDetails } from '../redux/userReducer'

function LoginForm() {

    const dispatch = useDispatch()
    const updateUsername = (e)=>{
        dispatch({
          type:`${changeDetails}`,
          payload:{
            name:"username",
            value:e.target.value
          }
        })
      }

    return (
        <div class={styles.loginContainer}>
            <form class={styles.loginForm}>
                <h1>Welcome Back</h1>
                <p>Please login to your account</p>
                <div class={styles.inputGroup}>
                    <input onChange={updateUsername} type="text" id="username" name="username" placeholder="Username" required />
                </div>
                <div class={styles.inputGroup}>
                    <input type="password" id="password" name="password" placeholder="Password"/>
                </div>
                <Link to={"/s"}><button type="submit">Login</button></Link>
                <div class={styles.bottomtext}>
                    <p>Don't have an account? <a href="#">Sign Up</a></p>
                    <p><a href="#">Forgot password?</a></p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
