import React from "react";

class Chat extends React.Component {
    state = {
        check: false,
    };

    componentDidMount() {
        document.title = "Fast Chat";
    }

    render() {
        return <>{this.state.check ? <p>Hello</p> : <p>False</p>}</>;
    }
}

export default Chat;
