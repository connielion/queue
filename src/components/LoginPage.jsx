import React from 'react';
import Button from 'react-bootstrap/Button';

const LoginPage = ({ signupButton }) => {
    return (
        <div className="container bg1">
            <form action="/dbRouter/login" method="POST" className="flex f-col">
                username: <input type="text" name="username" required /><br />
                password: <input type="password" name="password" required /><br />
                <Button id="signup" variant="dark">Login</Button>
                {/* <input id="signup" type="submit" value="Login" /> */}
            </form>
            <a href="/signup" onClick={signupButton}>
                <Button variant="link" className="auth-btn">Sign up here.</Button>
            </a>
        </div>
    );
}

export default LoginPage;