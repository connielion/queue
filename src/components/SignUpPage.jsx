import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
const SignUpPage = ({ loginButton }) => {
    function postToSignup() {
        console.log(`postToSignup() clicked`)
        axios.post(`/dbRouter/login`)
            .then(res => {
                console.log(`res from POST to /login`, res)
            })
    }
    return (
        <div className="container bg1">
            <form action="/dbRouter/signup" method="POST" className="flex f-col">
                username: <input type="text" name="username" required /><br />
                password: <input type="password" name="password" required /><br />
                <Button id="signup" variant="dark" onClick={postToSignup}>Sign up</Button>
            </form>
            <a href="/login" onClick={loginButton}>
                <Button variant="link" className="auth-btn">Login here.</Button>
            </a>
        </div>
    );
}

export default SignUpPage;