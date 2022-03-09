import axios from "axios";
import React from "react";
import ReactQuill from "react-quill"; // ES6
import { withRouter } from "react-router-dom";
import formatDateTime from "../../configs/formatDateTime";

import "react-quill/dist/quill.snow.css"; // ES6
import "./Note.css";

import io from "socket.io-client";
import ModalCheckPass from "./ModalCheckPass";
import NoteController from "./NoteController";
const serverHost = "http://localhost:5000/";
const socket = io(serverHost);

class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            code: "",
            password: "",
            updatedAt: "",
            isConfirmedPassword: false,
            focus: false,
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

    handleChange = (value) => {
        this.setState({
            content: value,
        });

        if (!this.state.focus) {
            return;
        }

        // console.clear();
        // console.log(this.state.content);

        axios
            .put("http://localhost:5000/api/note/update-content", {
                code: this.props.match.params.code,
                password: this.state.password,
                content: value,
            })
            .then((response) => {
                // console.log(response);
                socket.emit("update-note", {
                    code: this.props.match.params.code,
                    password: "",
                    content: value,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleConfirmedPassword = (data) => {
        console.log("handleConfirmPassword from Note.js: ", data);
        this.setState({
            content: data.content,
            code: data.code,
            password: data.password,
            updatedAt: formatDateTime(new Date(data.updatedAt)),
            isConfirmedPassword: true,
        });
    };

    async componentDidMount() {
        let code = this.props.match.params.code;

        document.title = `Fast Note - ${code}`;

        // this.state.focus
        //     ? this.bodyInput.current.focus()
        //     : this.bodyInput.current.blur();

        let res = await axios.get(`http://localhost:5000/api/note/${code}`);

        let note = res.data.data;

        // console.log(note.content);

        this.setState({
            code: note.code,
            password: note.password,
        });

        if (note.password !== "") {
            console.log("Private");
            return;
        }

        this.setState({
            content: note.content,
            updatedAt: formatDateTime(new Date(note.updatedAt)),
            isConfirmedPassword: true,
        });

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
            // console.log("update-note-caller-succeed: ", updatedAt);
        });

        //* others
        socket.on("update-note-other-succeed", (dataUpdate) => {
            // console.log(dataUpdate);
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
    }

    render() {
        let { code, password, content, updatedAt, isConfirmedPassword } =
            this.state;

        // console.log("Code: ", code, "\nPassword: ", password);

        return (
            <div
                className="container-fluid h-100 p-0"
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
                                            {" " + code + " - "}
                                        </span>
                                        &nbsp;
                                        <span className="text-success noti-note">
                                            <i className="bi bi-clock-history"></i>
                                            {" " + updatedAt}
                                        </span>
                                    </div>

                                    <ReactQuill
                                        theme="snow"
                                        modules={Note.modules}
                                        placeholder="ghi chú..."
                                        value={content}
                                        onChange={this.handleChange}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                        ref={this.bodyInput}
                                    ></ReactQuill>

                                    <NoteController password={password} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const { innerWidth: width, innerHeight: height } = window;
// alert(width);

let toolbarOption =
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

Note.modules = {
    toolbar: toolbarOption,
};

export default withRouter(Note);
