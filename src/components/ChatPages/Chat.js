import { withRouter } from "react-router-dom";
import ChatArea from "./ChatArea";
import HeaderChat from "./HeaderChat";

import "./normalize.min.css";
import "./Chat.css";
import { useEffect } from "react";

const Chat = (props) => {
    let roomId = props.match.params.roomId;

    useEffect(() => {
        // todo add handle script in jsx
        // const script = document.createElement("script");
        // script.src = "/js/handleFile.js";
        // script.async = true;
        // document.body.appendChild(script);
        // return () => {
        //     document.body.removeChild(script);
        // };
    });

    return <ChatArea roomId={roomId} listMessages={[]} />;
};

export default withRouter(Chat);
