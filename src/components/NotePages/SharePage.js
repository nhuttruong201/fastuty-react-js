import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const serverHost = API_ENDPOINT;
const socket = io(serverHost);
class SharePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowBody: false,
            isShared: false,
            content: "",
            errMsg: null,
        };
    }

    handleRealTime = (code) => {
        // TODO real time
        //* SEND
        socket.emit("join-room", code);

        //* RECEIVE

        //* caller
        socket.on("join-room-success", (msg) => {
            console.log("join-room-success: ", msg);
        });

        // socket.on("update-note-caller-succeed", (updatedAt) => {
        //     this.setState({
        //         updatedAt,
        //     });
        // });

        //* others
        socket.on("update-note-other-succeed", (dataUpdate) => {
            console.log(dataUpdate);
            let { socketId, content, updatedAt } = dataUpdate;
            // console.log("ID tao: ", socket.id, "ID mầy: ", socketId);

            this.setState({
                content,
            });
        });
    };

    async componentDidMount() {
        let code = this.props.match.params.code;
        document.title = `Note Share - ${code}`;

        await axios
            .get(API_ENDPOINT + "/api/note/" + code)
            .then((res) => {
                console.log(res);
                if (res.data.status === 200 && res.data.data.isShared) {
                    this.setState({
                        isShared: true,
                        content: res.data.data.content,
                        isShowBody: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });

        this.handleRealTime(code);
    }

    render() {
        let code = this.props.match.params.code;
        let { isShared, content, isShowBody } = this.state;

        return (
            <>
                <div className="container note-share-container py-3 px-4 bg-white">
                    {isShared ? (
                        <p className="text-primary">
                            <i className="bi bi-share"></i>
                            <i class="bi bi-dot"></i> {code} được chia sẻ.
                        </p>
                    ) : (
                        <p className="text-danger">
                            <i className="fas fa-exclamation"></i> Chế độ chia
                            sẻ đang tắt!
                        </p>
                    )}
                    {isShowBody && (
                        <div style={{ height: "95%" }}>
                            <ReactQuill
                                theme="bubble"
                                placeholder="chưa có nội dung..."
                                modules={this.modules}
                                value={content}
                                readOnly={true}
                            ></ReactQuill>
                        </div>
                    )}
                </div>
            </>
        );
    }

    modules = {
        syntax: true,
        toolbar: {
            container: null,
        },
    };
}

export default withRouter(SharePage);
