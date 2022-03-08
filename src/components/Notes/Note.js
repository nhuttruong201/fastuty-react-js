import axios from "axios";
import React from "react";
import ReactQuill from "react-quill"; // ES6
import { withRouter } from "react-router-dom";

import "react-quill/dist/quill.snow.css"; // ES6
import "./Note.css";

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            code: "",
            password: "",
        }; // You can also pass a Quill Delta here
    }

    handleChange = (value) => {
        this.setState({
            content: value,
        });
        console.clear();
        console.log(this.state.content);

        axios
            .put("http://localhost:5000/api/note/update-content", {
                code: this.props.match.params.code,
                password: "",
                content: value,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    async componentDidMount() {
        document.title = "Fast Note";
        let code = this.props.match.params.code;
        console.log("Check code: ", code);

        let res = await axios.get(`http://localhost:5000/api/note/${code}`);

        let note = res.data.data;

        console.log(note.content);

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
        });
    }

    render() {
        let { code, password, content } = this.state;

        console.log("Code: ", code, "\nPassword: ", password);

        return (
            <div className="row justify-content-center h-100">
                <div className="col-md-12 col-lg-10 px-2 h-100">
                    <div className="editor">
                        {password !== "" ? (
                            <p>Ghi chú được bảo mật</p>
                        ) : (
                            <ReactQuill
                                theme="snow"
                                modules={Note.modules}
                                placeholder="ghi chú..."
                                value={content}
                                onChange={this.handleChange}
                            ></ReactQuill>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Note.modules = {
    toolbar: [
        ["bold", "italic", "underline", "link", "blockquote", "code-block"],
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
    ],
};

export default withRouter(Note);
