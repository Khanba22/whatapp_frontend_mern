import React from 'react'
import styles from "../stylesheets/SignUpForm.module.css"
import { jwtDecode } from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google'
import { useDispatch, useSelector } from 'react-redux'
import { changeDetails } from '../redux/userReducer'


function SignUpForm() {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleChange = (e)=>{
        dispatch({
            type:`${changeDetails}`,
            payload:{
                [e.target.name]:e.target.value
            }
        })
    }

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm}>
                <h1>Welcome Back</h1>
                <p>Enter Your Account Details</p>
                <div className={styles.inputGroup}>
                    <input onChange={handleChange} value={user.username} type="text" id="username" name="username" placeholder="Username" required />
                </div>
                <div className={styles.inputGroup}>
                    <input onChange={handleChange} value={user.password} type="password" id="password" name="password" placeholder="Password" />
                </div>
                <div className={styles.inputGroup}>
                    <input onChange={handleChange} value={user.email} type="text" id="email" name="email" placeholder="Email" required />
                </div>
                <div className={styles.inputGroup}>
                    <input onChange={handleChange} value={user.contactNo} type="number" id="contactNo" name="contactNo" placeholder="Contact Number" />
                </div>
                <button type="submit"  >Signup</button>
                <div className={styles.bottomtext}>
                    <p>Already have an account? <a href="/">Login</a></p>
                </div>
                <GoogleLogin
                    shape='pill'
                    onSuccess={credentialResponse => {
                        console.log(jwtDecode(credentialResponse.credential))
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </form>
        </div>
    )
}

export default SignUpForm
