import { withRouter } from "react-router-dom";
import ChatArea from "./ChatArea";
import ConversationArea from "./ConversationArea";
import HeaderChat from "./HeaderChat";

import "./normalize.min.css";
import "./Chat.css";

const Chat = (props) => {
    let roomId = props.match.params.roomId;

    return (
        <>
            <div className="container main-container-chat p-0">
                <div className="bg-white">
                    <HeaderChat />
                </div>

                <div className="wrapper h-100 bg-white">
                    <ConversationArea />
                    <ChatArea roomId={roomId} listMessages={[]} />
                </div>
            </div>
        </>
    );
};

export default withRouter(Chat);
