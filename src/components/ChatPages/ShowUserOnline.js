const ShowUserOnline = (props) => {
    let { myInfo, users } = props;

    // console.log("check props users: ", users);

    return (
        <>
            <div className="offcanvas offcanvas-start" id="showUserOnline">
                <div className="offcanvas-header">
                    <h4 className="offcanvas-title">Mọi người</h4>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <div className="conversation-area-mobile">
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
                                    <span className="msg-message">
                                        Tham gia lúc
                                    </span>
                                    <span className="msg-date">
                                        {myInfo.joinedAt}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {users &&
                            users.map((user, index) => (
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
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowUserOnline;
