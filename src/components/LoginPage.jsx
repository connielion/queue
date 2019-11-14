import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
const LoginPage = props => {
    const { loginButton } = props;
    // add function POST to /dbRouter/login
    // function postToLogin() {
    //     console.log(`postToLogin() clicked`)
    //     axios.post(`/dbRouter/login`)
    //         .then(res => {
    //             console.log(`res from POST to /login`, res)
    //         })
    // }
    console.log(`props login`, loginButton)
    console.log('props: ', props)
    return (
        <div className="container bg1">
            <h1>Login</h1>
            <form action="/dbRouter/login" method="POST" className="flex f-col">
                Username: <input type="text" name="username" required /><br />
                Password: <input type="password" name="password" required autoComplete="true" /><br />
                <Button id="signup" onClick={loginButton}>Login</Button>
                {/* <input id="signup" type="submit" value="Login" /> */}
            </form>
            <a href="/signup">
                <Button variant="link" className="auth-btn">Sign up here.</Button>
            </a>
        </div>
    );
}

export default LoginPage;