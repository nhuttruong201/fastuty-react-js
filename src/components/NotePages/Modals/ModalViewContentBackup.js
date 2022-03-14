import axios from "axios";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"; // ES6

import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class ModalViewContentBackup extends React.Component {
    constructor() {
        super();

        this.state = {
            contentView: "",
            commitView: "",
            backupIdView: "",
            okMsg: "",
        };
    }

    handleRestore = async (backupId) => {
        console.log("Restore: ", backupId);
        await axios
            .post(API_ENDPOINT + "/api/note/backup/restore", {
                _id: backupId,
            })
            .then((res) => {
                console.log("res from handleRetore: ", res);
                if (res.data.status === 200) {
                    this.setState({
                        okMsg: "Khôi phục thành công!",
                    });
                }
            })
            .catch((err) => {
                console.log("err from handleRetore: ", err);
            });
    };

    async componentDidMount() {
        let { _id } = this.props;
        await axios
            .post(API_ENDPOINT + "/api/note/backup/get-content", {
                _id,
            })
            .then((res) => {
                console.log("handleGetContentByCommit: ", res);

                this.setState({
                    contentView: res.data.data.content,
                    commitView: res.data.data.commit,
                    backupIdView: res.data.data._id,
                });
            })
            .catch((err) => {
                console.log("err handleGetContentByCommit: ", err);
            });
    }

    render() {
        let { close } = this.props;
        let { contentView, commitView, backupIdView, okMsg } = this.state;
        return (
            <div>
                <Modal
                    isOpen={true}
                    centered={true}
                    autoFocus={false}
                    scrollable
                    size={contentView.length > 255 ? "xl" : "lg"}
                >
                    <ModalHeader>
                        <i className="fas fa-history"></i> commit:
                        <strong> {commitView}</strong>
                    </ModalHeader>
                    <ModalBody className="p-2">
                        {/* <div>{contentView}</div> */}
                        <div>
                            <ReactQuill
                                theme="bubble"
                                // modules={Note.modules}
                                placeholder="đang tải nội dung sao lưu..."
                                value={contentView}
                                readOnly={true}
                            ></ReactQuill>
                        </div>
                        {okMsg ? (
                            <Alert color="success mt-3">
                                <i className="bi bi-check2-circle"></i> {okMsg}
                            </Alert>
                        ) : null}
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => this.handleRestore(backupIdView)}
                        >
                            <i className="fas fa-undo-alt"></i> Khôi phục nội
                            dung
                        </button>{" "}
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => close()}
                        >
                            Đóng
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalViewContentBackup;
