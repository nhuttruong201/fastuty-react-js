const ConversationArea = (props) => {
    let { myInfo, users } = props;
    // console.log("check props myInfo from ConversationArea: ", myInfo);
    // console.log("check props users from ConversationArea: ", users);

    return (
        <div className="conversation-area">
            <div className="msg online active">
                <img
                    className="msg-profile"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                    alt=""
                />
                <div className="msg-detail">
                    <div className="msg-username">
                        {myInfo.displayName + "(Bạn)"}
                    </div>
                    <div className="msg-content">
                        <span className="msg-message">Tham gia lúc</span>
                        <span className="msg-date">{myInfo.joinedAt}</span>
                    </div>
                </div>
            </div>
            {users &&
                users.map(
                    (user, index) =>
                        user.displayName !== myInfo.displayName && (
                            <div key={index} className="msg online">
                                <img
                                    className="msg-profile"
                                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                                    alt=""
                                />
                                <div className="msg-detail">
                                    <div className="msg-username">
                                        {user.displayName}
                                    </div>
                                    <div className="msg-content">
                                        <span className="msg-message">
                                            Tham gia lúc
                                        </span>
                                        <span className="msg-date">
                                            {user.joinedAt}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                )}
            <div className="overlay" />
        </div>
    );
};

export default ConversationArea;
