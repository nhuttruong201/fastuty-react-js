import axios from "axios";
import React from "react";

// import hljs from "highlight.js";

import ReactQuill from "react-quill"; // ES6

import { withRouter } from "react-router-dom";

import formatDateTime from "../../configs/formatDateTime";

import "react-quill/dist/quill.snow.css"; // ES6

import "./Note.css";

import ModalCheckPass from "./Modals/ModalCheckPass";
import NoteController from "./NoteController";
import { connect } from "react-redux";
import io from "socket.io-client";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const serverHost = API_ENDPOINT;
const socket = io(serverHost);
const { innerWidth: width, innerHeight: height } = window;

class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            code: "",
            password: "",
            isShared: false,
            updatedAt: "",
            isConfirmedPassword: true,
            focus: false,
            isShowNotiUpdatedNote: false,
        };

        this.bodyInput = React.createRef();
    }

    onFocus = () => {
        console.log("onFocus");
        this.setState({
            focus: true,
        });
    };

    onBlur = () => {
        console.log("onBlur");
        this.setState({
            focus: false,
        });
    };

    handleChangeContent = (value) => {
        this.setState({
            content: value,
        });

        if (!this.state.focus) {
            return;
        }

        axios
            .put(`${API_ENDPOINT}/api/note/update-content`, {
                code: this.props.match.params.code,
                password: this.state.password,
                content: value,
            })
            .then((res) => {
                // console.log(response);
                socket.emit("update-note", {
                    code: this.props.match.params.code,
                    password: this.state.password,
                    content: value,
                });

                setTimeout(() => {
                    this.setState({
                        isShowNotiUpdatedNote: true,
                    });
                }, 500);

                setTimeout(() => {
                    this.setState({
                        isShowNotiUpdatedNote: false,
                    });
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleConfirmedPassword = (data) => {
        // console.log("handleConfirmPassword from Note.js: ", data);
        this.setState({
            content: data.content,
            code: data.code,
            password: data.password,
            updatedAt: formatDateTime(new Date(data.updatedAt)),
            isConfirmedPassword: true,
        });

        // *realtime
        this.handleRealTime(data.code);
    };

    handleSubmitCode = (newCode) => {
        this.props.history.push("/note/" + newCode);
        this.loadData(newCode);
    };

    loadData = async (code) => {
        // console.log("Load data: ", code);

        document.title = `Fast Note - ${code}`;

        let res = await axios.get(`${API_ENDPOINT}/api/note/${code}`);

        let note = res.data.data;

        console.log(note);

        this.setState({
            code: note.code,
            password: note.password,
            isShared: note.isShared,
            isConfirmedPassword: note.password === "" ? true : false,
        });

        if (note.password !== "") {
            console.log("Note Is Private !!");
            return;
        }

        this.setState({
            content: note.content,
            updatedAt: formatDateTime(new Date(note.updatedAt)),
            isConfirmedPassword: true,
        });

        // * real time
        this.handleRealTime(code);
    };

    handleRealTime = (code) => {
        // TODO real time
        //* SEND
        socket.emit("join-room", code);

        //* RECEIVE
        socket.on("connect", () => {
            console.log(">>>>>>>> check realtime: ", socket.id);
        });

        //* caller
        socket.on("join-room-success", (msg) => {
            console.log("join-room-success: ", msg);
        });

        socket.on("update-note-caller-succeed", (updatedAt) => {
            this.setState({
                updatedAt,
            });
        });

        //* others
        socket.on("update-note-other-succeed", (dataUpdate) => {
            console.log(dataUpdate);
            let { socketId, content, updatedAt } = dataUpdate;
            console.log("ID tao: ", socket.id, "ID mầy: ", socketId);

            this.bodyInput.current.blur();

            if (!this.state.focus) {
                this.setState({
                    content,
                    updatedAt,
                });
            }
        });
    };

    handleUpdateShareState = (isShared) => {
        console.log("Check share state from Note.jsL: ", isShared);
        this.setState({
            isShared,
        });
    };

    async componentDidMount() {
        let code = this.props.match.params.code;

        await this.loadData(code);
        // this.state.focus
        //     ? this.bodyInput.current.focus()
        //     : this.bodyInput.current.blur();
    }

    render() {
        let {
            code,
            password,
            content,
            isShared,
            updatedAt,
            isConfirmedPassword,
            isShowNotiUpdatedNote,
        } = this.state;

        console.log("Check isShared from note: ", isShared);

        console.log("check props redux: ", this.props.dataRedux);

        return (
            <div
                className="container-fluid main-container-note"
                style={{ overflow: "hidden" }}
            >
                <div className="row justify-content-center h-100">
                    <div className="col-md-12 col-lg-10 h-100 py-3">
                        <div className="editor">
                            {!isConfirmedPassword ? (
                                <>
                                    <ModalCheckPass
                                        confirmedPassword={
                                            this.handleConfirmedPassword
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="mb-2 px-md-0 px-2">
                                        <span className="code-note">
                                            <i className="bi bi-pencil-fill"></i>
                                            {" " + code + " "}
                                        </span>
                                        &nbsp;
                                        <span className="noti-note">
                                            <i className="bi bi-clock-fill"></i>
                                            {" " + updatedAt}
                                        </span>
                                        <span className="noti-note">
                                            {isShowNotiUpdatedNote ? (
                                                <>
                                                    {" "}
                                                    <i className="bi bi-check"></i>
                                                    Đã lưu
                                                </>
                                            ) : null}
                                        </span>
                                    </div>

                                    <ReactQuill
                                        theme="snow"
                                        modules={this.modules}
                                        placeholder="ghi chú..."
                                        value={content}
                                        onChange={this.handleChangeContent}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                        ref={this.bodyInput}
                                    ></ReactQuill>

                                    <NoteController
                                        password={password}
                                        code={code}
                                        isShared={isShared}
                                        updateShareState={
                                            this.handleUpdateShareState
                                        }
                                        submitCode={this.handleSubmitCode}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    toolbarOption =
        width < 576
            ? [
                  "bold",
                  "italic",
                  "underline",
                  "blockquote",
                  "code-block",
                  "image",
                  "video",
                  { list: "ordered" },
                  { list: "bullet" },
                  { color: [] },
                  { background: [] },
                  "clean",
              ]
            : [
                  [
                      "bold",
                      "italic",
                      "underline",
                      "link",
                      "blockquote",
                      "code-block",
                  ],
                  ["image"],
                  [{ header: 1 }, { header: 2 }],
                  [
                      {
                          list: "ordered",
                      },
                      {
                          list: "bullet",
                      },
                  ],
                  [
                      {
                          color: [],
                      },
                      {
                          background: [],
                      },
                      {
                          align: [],
                      },
                  ],

                  ["clean"],
              ];

    modules = {
        syntax: true,
        toolbar: {
            container: this.toolbarOption,
            // handlers: {
            //     insertImage: this.imageHandler,
            //     insertVideo: this.videoHandler,
            //     insertFile: this.fileHandler,
            // },
        },
    };
}

const mapStateToProps = (state) => {
    return {
        dataRedux: state.users,
    };
};

export default connect(mapStateToProps)(withRouter(Note));
