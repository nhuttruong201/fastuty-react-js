const ChatMessage = (props) => {
    let { time, textMessage, isOwner } = props;
    let classMessage = isOwner ? "chat-msg owner" : "chat-msg";

    return (
        <>
            <div className={classMessage}>
                <div className="chat-msg-profile">
                    <img
                        className="chat-msg-img"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                        alt=""
                    />
                    <div className="chat-msg-date">{time}</div>
                </div>
                <div className="chat-msg-content">
                    <div
                        className="chat-msg-text"
                        dangerouslySetInnerHTML={{ __html: textMessage }}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default ChatMessage;
