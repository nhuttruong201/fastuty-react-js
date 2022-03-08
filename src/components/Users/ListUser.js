import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ListUser extends React.Component {
    state = {
        users: [],
    };

    async componentDidMount() {
        document.title = "List user";

        let res = await axios.get("https://reqres.in/api/users?page=2");
        this.setState({
            users: res && res.data && res.data.data ? res.data.data : [],
        });
    }

    render() {
        return (
            <div className="p-4">
                <h1>List user</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Id</th>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Avatar</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <img
                                            src={item.avatar}
                                            alt={item.avatar}
                                            height="40"
                                            width="40"
                                        />
                                    </td>
                                    <td>
                                        <Link to={"/users/" + item.id}>
                                            Detail
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListUser;
