import React from "react";
import {
    Alert,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";

import { withRouter } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

class ModalBackup extends React.Component {
    constructor() {
        super();

        this.state = {
            commit: "",
            errMsg: "",
            okMsg: "",
        };
    }

    handleBackup = async () => {
        // console.log("handleBackup");
        let { code } = this.props.match.params;
        let { commit } = this.state;
        let { password } = this.props;

        if (!commit) {
            this.setState({
                errMsg: "Bạn chưa nhập commit!",
                okMsg: null,
            });
            return;
        }

        console.log("handleBackup: commit: ", commit, " password: " + password);

        await axios
            .post(process.env.REACT_APP_API_ENDPOINT + "/api/note/backup", {
                code,
                password,
                commit,
            })
            .then((res) => {
                // console.log("res from backup: ", res);
                if (res.data.status === 200) {
                    this.setState({
                        okMsg: "Sao lưu thành công!",
                        errMsg: null,
                    });
                }
            })
            .catch((err) => {
                console.log("err from backup: ", err);
                this.setState({
                    errMsg: "Đã xảy ra lỗi!",
                    okMsg: null,
                });
            });
    };

    handleOnChangeCommit = (e) => {
        this.setState({
            commit: e.target.value,
        });
    };

    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.handleBackup();
        }
    };

    render() {
        let code = this.props.match.params.code;
        let { commit, errMsg, okMsg } = this.state;
        let { isShow, isClose, password: passwordCurrent } = this.props;

        return (
            <div>
                <Modal isOpen={isShow} centered={true} autoFocus={false}>
                    <ModalHeader>
                        <i className="fas fa-upload"></i> Sao lưu ghi chú
                    </ModalHeader>
                    <ModalBody className="p-4">
                        <div
                            className="text-black-80"
                            style={{ fontSize: "15px" }}
                        >
                            <p className="text-justify">
                                <i className="bi bi-info-circle text-info"></i>
                                &nbsp; Sao lưu giúp lưu trữ lại nội dung ghi chú
                                an toàn, phòng khi bạn vô tình xóa mất nội dung
                                quan trọng.
                            </p>
                            <p className="text-justify">
                                <i className="bi bi-info-circle text-info"></i>
                                &nbsp; Hãy đặt commit để phân biệt các phiên lưu
                                trữ.
                            </p>
                        </div>

                        <div className="form-group mt-4">
                            <label style={{ fontSize: "14px" }}>
                                Commit cho phiên lưu trữ
                            </label>
                            <input
                                type={"text"}
                                value={commit}
                                placeholder={"nhập commit"}
                                maxLength={255}
                                className="form-control mt-2"
                                onKeyDown={(e) => this.handleKeyDown(e)}
                                onChange={(e) => this.handleOnChangeCommit(e)}
                                autoFocus
                            />
                        </div>

                        {errMsg ? (
                            <Alert color="danger mt-2">
                                <i className="bi bi-exclamation-diamond-fill"></i>{" "}
                                {errMsg}
                            </Alert>
                        ) : null}
                        {okMsg ? (
                            <Alert color="success mt-2">
                                <i className="bi bi-check2-circle"></i> {okMsg}
                            </Alert>
                        ) : null}
                    </ModalBody>
                    <ModalFooter className="justify-content-between">
                        <div className="float-left">
                            <Link to={"/note/backup/" + code}>
                                <button className="btn btn-primary btn-sm">
                                    <i className="bi bi-cloud-arrow-up-fill"></i>{" "}
                                    Kho lưu trữ
                                </button>
                            </Link>
                        </div>
                        <div className="float-right">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.handleBackup()}
                            >
                                <i className="fas fa-upload"></i> Sao lưu
                            </button>{" "}
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => isClose("backup")}
                            >
                                Đóng
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default withRouter(ModalBackup);
