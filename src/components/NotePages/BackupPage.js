import axios from "axios";
import React from "react";
import { Alert, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import formatDateTime from "../../configs/formatDateTime";
import ModalViewContentBackup from "./Modals/ModalViewContentBackup";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import BackupController from "./BackupController";
import DialogConfirmDelete from "./DialogConfirmDelete";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class BackupPage extends React.Component {
    constructor() {
        super();

        this.state = {
            data: [],
            isShowModalViewContent: false,
            showDialogConfirmDelete: false,
            commitDelete: "",
            commitViewId: "",
            backupDeleteId: "",
        };
    }

    handleShowModalViewContent = (_id) => {
        this.setState({
            commitViewId: _id,
            isShowModalViewContent: true,
        });
    };

    handleCloseModalViewContent = () => {
        this.setState({
            isShowModalViewContent: false,
        });
    };

    handleConfirmDelete = async (backupId) => {
        // this.setState({
        //     showDialog: false,
        // });
        // alert("Delete: " + backupId);
        await axios
            .put(API_ENDPOINT + "/api/note/backup/delete-commit", {
                backupId,
            })
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    // alert("deleted");
                    this.setState({
                        data: this.state.data.filter(
                            (item) => item._id !== backupId
                        ),
                        showDialogConfirmDelete: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleCloseDialogConfirm = () => {
        this.setState({
            showDialogConfirmDelete: false,
        });
    };

    handleShowDialogConfirmDelete = (backupId, commit) => {
        this.setState({
            showDialogConfirmDelete: true,
            commitDelete: commit,
            backupDeleteId: backupId,
        });
    };

    async componentDidMount() {
        let { code } = this.props.match.params;
        document.title = `Note Backup - ${code}`;

        await axios
            .get(API_ENDPOINT + "/api/note/backup/" + code)
            .then((res) => {
                console.log(res);
                this.setState({
                    data: res.data.data,
                });
            })
            .catch((err) => {
                console.log("err from call api get backup by code: ", err);
            });
    }

    render() {
        let {
            data,
            isShowModalViewContent,
            showDialogConfirmDelete,
            commitDelete,
            commitViewId,
            backupDeleteId,
        } = this.state;
        let { code } = this.props.match.params;

        return (
            <div className="container mt-3 py-3 px-4 bg-white h-75">
                <h4 style={{ color: "#34568b" }}>Kho lưu trữ</h4>
                <p>
                    Hiện có{" "}
                    <strong className="text-primary">{data.length}</strong>{" "}
                    commit cho{" "}
                    <strong>
                        <Link to={"/note/" + code}>{code}</Link>
                    </strong>
                    .
                </p>
                <div
                    style={{
                        height: "70%",
                        overflowY: "auto",
                        borderBottom: "solid 8px #34568b",
                        paddingBottom: "15px",
                    }}
                >
                    <table className="table table-hover table-responsive-sm table-fix-head">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Commit</th>
                                <th>Thời gian</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.commit}</td>
                                            <td>
                                                {formatDateTime(
                                                    new Date(item.createdAt)
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="m-1 btn btn-primary btn-sm"
                                                    onClick={() =>
                                                        this.handleShowModalViewContent(
                                                            item._id
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-eye-fill"></i>
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        this.handleShowDialogConfirmDelete(
                                                            item._id,
                                                            item.commit
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>

                <BackupController code={code} />

                {isShowModalViewContent && (
                    <ModalViewContentBackup
                        close={this.handleCloseModalViewContent}
                        _id={commitViewId}
                    />
                )}

                {showDialogConfirmDelete && (
                    <DialogConfirmDelete
                        backupId={backupDeleteId}
                        commit={commitDelete}
                        close={this.handleCloseDialogConfirm}
                        confirm={this.handleConfirmDelete}
                    />
                )}
            </div>
        );
    }
}

export default withRouter(BackupPage);
