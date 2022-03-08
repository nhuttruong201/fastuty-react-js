import React from "react";

class Form extends React.Component {
    state = {
        username: "",
        password: "",
    };

    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    };

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleOnclickLogin = () => {
        console.log("login");
        console.log("username: ", this.state.username);
        console.log("password: ", this.state.password);
    };

    render() {
        let { username, password } = this.state;
        return (
            <div className="container pt-4">
                <h2>Login</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        autoFocus
                        value={username}
                        onChange={(e) => this.handleOnChangeUsername(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => this.handleOnChangePassword(e)}
                    />
                </div>

                <button
                    className="btn btn-danger btn-block"
                    onClick={() => this.handleOnclickLogin()}
                >
                    Login
                </button>
            </div>
        );
    }
}

export default Form;
