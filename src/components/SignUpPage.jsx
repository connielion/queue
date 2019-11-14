import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
const SignUpPage = (props) => {
    const { signupButton } = props;
    // getValue = function (e) {
    //     console.log(e.target.value)
    // // }
    // postToSignup = function () {
    //     console.log(`postToSignup() clicked`)
    //     axios.post(`/dbRouter/signup`)
    //         .then(res => {
    //             console.log(`res from POST to /login`, res)
    //         })
    // }

    // const getUsername = getValue()
    // const getPassword = getValue()
    return (
        <div className="container bg1">
            <h1>Sign Up</h1>
            <form action="/dbRouter/signup" method="POST" className="flex f-col">
                Username: <input type="text" name="username" required /><br />
                Password: <input type="password" name="password" required autoComplete="true" /><br />
                <Button id="signup" variant="dark" onClick={(e) => signupButton} >Sign up</Button>
            </form>
            <a href="/login" >
                <Button variant="link" className="auth-btn">Login here.</Button>
            </a>
        </div>
    );

}

export default SignUpPage;