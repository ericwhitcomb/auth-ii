import React from 'react';
import axios from 'axios';

class Login extends React.Component {

    state = {
        username: "",
        password: "",
        message: "",
    };

    handleUsername = event => {
        this.setState({ username: event.target.value });
    };

    handlePassword = event => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.username.length === 0 || this.state.password.length === 0) {
            this.setState({ message: "Must enter username and password to login" });
        } else {
            this.setState({ message: "Logging in..." });
            const creds = { username: this.state.username, password: this.state.password };
            axios.post('http://localhost:5000/api/auth/login', creds)
                .then(response => {
                    localStorage.setItem('jwt', response.data.token);
                    localStorage.setItem('username', response.data.username);
                    this.props.history.push("/users");
                })
                .catch(err => {
                    this.setState({ message: err.response.data.message });
                });
        }
    };

    render() {
        return (
            <>
                <div className="login-wrapper">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <input
                            className="username-field"
                            text="text"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleUsername}
                        />
                        <input
                            className="password-field"
                            type="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handlePassword}
                        />
                        <button
                            className="login-button"
                            type="submit"
                            onClick={this.handleSubmit}>
                            Login
                    </button>
                    </form>
                </div>
                <div className="form-message">
                    {this.state.message}
                </div>
            </>
        )
    }
}

export default Login;