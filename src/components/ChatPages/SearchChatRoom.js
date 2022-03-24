import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import randomId from "../../services/randomId";

const SearchChatRoom = (props) => {
    const [errMsg, setErrMsg] = useState(null);
    const [roomId, setRoomId] = useState("");
    const history = useHistory();

    const handleChangeRoomId = (e) => {
        setRoomId(e.target.value);
    };

    const handleRandomRoomId = (e) => {
        e.preventDefault();
        setRoomId(randomId(5));
        setErrMsg(null);
    };

    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (roomId === "") {
            setErrMsg("Bạn chưa nhập mã phòng!");
            return;
        }

        history.push("/chat/" + roomId);
    };

    useEffect(() => {
        document.title = "Fast Chat";
    }, []);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-5 col-sm-10 col-12">
                    <div className="mx-auto mt-4 px-4 py-5 bg-white rounded border">
                        <h5 className="position-relative d-inline-block text-primary text-uppercase">
                            fastchat
                        </h5>
                        <form>
                            <div className="form-group mt-4">
                                {errMsg && (
                                    <p className="text-danger">{errMsg}</p>
                                )}
                                <input
                                    type={"text"}
                                    value={roomId}
                                    autoFocus
                                    placeholder="nhập mã phòng chat..."
                                    className="form-control text-center"
                                    onChange={(e) => handleChangeRoomId(e)}
                                />
                            </div>
                            <div className="form-group mt-3 text-center">
                                <button
                                    className="btn btn-primary  m-1"
                                    onClick={(e) => handleJoinRoom(e)}
                                >
                                    <i className="fas fa-sign-in-alt"></i> Tham
                                    gia
                                </button>
                                <button
                                    className="btn btn-primary m-1"
                                    onClick={(e) => handleRandomRoomId(e)}
                                >
                                    <i className="fas fa-random"></i>
                                </button>
                            </div>
                        </form>
                        <p
                            className="text-center p-4 text-black-50"
                            style={{ fontSize: "14px" }}
                        >
                            <span>
                                Những người cùng mã phòng sẽ chat được với nhau.
                            </span>
                            <br></br>
                            <span>
                                Tất cả tin nhắn sẽ biến mất sau khi cuộc trò
                                chuyện kết thúc.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SearchChatRoom);
