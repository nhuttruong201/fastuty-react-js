import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class DetailUser extends React.Component {
    state = {
        user: {},
    };

    async componentDidMount() {
        document.title = "User detail";

        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            let res = await axios.get(`https://reqres.in/api/users/${id}`);
            console.log(res);

            this.setState({
                user: res.data && res.data.data ? res.data.data : {},
            });
        }
    }

    render() {
        console.log(this.props.match.params.id);
        let { id, email, first_name, last_name, avatar } = this.state.user;

        return (
            <div className="p-4 text-center">
                <p>User Id: {id}</p>
                <p>Email: {email}</p>
                <p>Fisrt name: {first_name}</p>
                <p>Last name: {last_name}</p>
                <p>
                    <img src={avatar} alt={avatar} height="120" width="120" />
                </p>

                <Link to={"/users"}>Back to list</Link>
            </div>
        );
    }
}

export default withRouter(DetailUser);
