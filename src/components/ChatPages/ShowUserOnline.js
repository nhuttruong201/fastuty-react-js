const ShowUserOnline = (props) => {
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
                        <div className="msg online">
                            <img
                                className="msg-profile"
                                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                                alt=""
                            />
                            <div className="msg-detail">
                                <div className="msg-username">Vinh Dâu</div>
                                <div className="msg-content">
                                    <span className="msg-message">
                                        Tham gia lúc
                                    </span>
                                    <span className="msg-date">20m</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowUserOnline;
