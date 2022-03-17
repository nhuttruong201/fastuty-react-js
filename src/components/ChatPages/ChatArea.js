import moment from "moment";
import { useEffect, useRef, useState } from "react";
import randomId from "../../services/randomId";
import ChatMessage from "./ChatMessage";
import io from "socket.io-client";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const serverHost = API_ENDPOINT;
const socket = io(serverHost);

const ChatArea = (props) => {
    const [textMessage, setTextMessage] = useState("");
    const [timeLoad, setTimLoad] = useState(new Date());
    const messagesEndRef = useRef(null);

    const listMessages = props.listMessages;

    const handleOnChangeTextMessage = (e) => {
        setTextMessage(e.target.value);
    };

    const handleSendMessage = () => {
        // real time
        socket.emit("send-message-to-room", {
            roomId: props.roomId,
            senderName: "NT",
            textMessage: textMessage,
            time: moment(new Date()).format("hh:mm A"),
        });
    };

    const handleSendLike = () => {
        socket.emit("send-message-to-room", {
            roomId: props.roomId,
            senderName: "NT",
            textMessage: '<i class="fas fa-thumbs-up"></i>',
            time: moment(new Date()).format("hh:mm A"),
        });
    };

    const handleOnKeyDownSendMessage = (e) => {
        if (e.key === "Enter" && textMessage !== "") {
            handleSendMessage();
        }
    };

    const handleChatRealtime = (roomId) => {
        // TODO real time
        socket.emit("join-chat-room", props.roomId);
        socket.on("join-chat-room-success", (msg) => {
            console.log(msg);
        });

        //* RECEIVE
        //* caller
        socket.on("send-message-caller-succeed", (dataMessage) => {
            let { textMessage, time } = dataMessage;
            console.log("send-message-caller-succeed: ", listMessages);

            listMessages.push(
                <ChatMessage
                    key={randomId(10)}
                    textMessage={textMessage}
                    time={time}
                    isOwner={true}
                />
            );

            setTextMessage("");
            setTimLoad(new Date());
        });

        //* others
        socket.on("send-message-others-succeed", (dataMessage) => {
            let { senderName, textMessage, time } = dataMessage;
            console.log(
                "send-message-others-succeed: ",
                senderName,
                textMessage,
                time
            );

            listMessages.push(
                <ChatMessage
                    key={randomId(10)}
                    textMessage={textMessage}
                    time={time}
                    isOwner={false}
                />
            );

            setTimLoad(new Date());
        });
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        document.title = "Fast Chat - " + props.roomId;
        handleChatRealtime(props.roomId);
    }, [props.roomId]);

    useEffect(() => {
        scrollToBottom();
    });

    return (
        <div className="chat-area">
            <div className="chat-area-header">
                <div className="chat-area-title">{props.roomId}</div>
                <div className="chat-area-group">
                    <img
                        className="chat-area-profile"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
                        alt=""
                    />
                    <img
                        className="chat-area-profile"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png"
                        alt=""
                    />
                    <img
                        className="chat-area-profile"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png"
                        alt=""
                    />
                    <span>+4</span>
                    {/* <span>4</span> */}
                </div>
            </div>

            <div className="chat-area-main">
                {listMessages.map((item, index) => item)}
                <div ref={messagesEndRef}></div>
            </div>
            {/* TODO FOOTER */}
            <div className="chat-area-footer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-image"
                >
                    <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                </svg>
                <input
                    type="text"
                    value={textMessage}
                    placeholder="Soạn tin nhắn..."
                    autoFocus
                    onKeyDown={(e) => handleOnKeyDownSendMessage(e)}
                    onChange={(e) => handleOnChangeTextMessage(e)}
                />
                {textMessage !== "" ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-send-fill"
                        viewBox="0 0 16 16"
                        onClick={() => handleSendMessage()}
                    >
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-thumbs-up"
                        onClick={() => handleSendLike()}
                    >
                        <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                    </svg>
                )}
            </div>
        </div>
    );
};

export default ChatArea;
