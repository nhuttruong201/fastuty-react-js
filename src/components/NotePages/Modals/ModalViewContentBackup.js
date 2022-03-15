import axios from "axios";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"; // ES6

import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DialogConfirmRestore from "../Confirms/DialogConfirmRestore";

import { withRouter } from "react-router-dom";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class ModalViewContentBackup extends React.Component {
    constructor() {
        super();

        this.state = {
            contentView: "",
            commitView: "",
            backupIdView: "",
            showDialogConfirmRestore: false,
        };
    }

    handleShowHideDialogConfirmRestore = (isShow) => {
        this.setState({
            showDialogConfirmRestore: isShow,
        });
    };

    handleRestore = async (backupId) => {
        console.log("Restore: ", backupId);
        await axios
            .post(API_ENDPOINT + "/api/note/backup/restore", {
                _id: backupId,
            })
            .then((res) => {
                console.log("res from handleRetore: ", res);
                if (res.data.status === 200) {
                    this.props.history.push(
                        "/note/" + this.props.match.params.code
                    );
                }
            })
            .catch((err) => {
                alert("Đã xảy ra lỗi!");
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
        let {
            contentView,
            commitView,
            backupIdView,
            showDialogConfirmRestore,
        } = this.state;

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
                        <div>
                            <ReactQuill
                                theme="bubble"
                                modules={this.modules}
                                placeholder="đang tải nội dung sao lưu..."
                                value={contentView}
                                readOnly={true}
                            ></ReactQuill>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                                this.handleShowHideDialogConfirmRestore(true)
                            }
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

                {showDialogConfirmRestore && (
                    <DialogConfirmRestore
                        backupId={backupIdView}
                        commit={commitView}
                        close={this.handleShowHideDialogConfirmRestore}
                        confirm={this.handleRestore}
                    />
                )}
            </div>
        );
    }

    modules = {
        syntax: true,
        toolbar: {
            container: null,
        },
    };
}

export default withRouter(ModalViewContentBackup);
