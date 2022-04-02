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
import { Link } from "react-router-dom";
class ModalUpload extends React.Component {
    render() {
        let { isClose } = this.props;
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader>
                        <i className="fas fa-upload"></i> Sao lưu ghi chú
                    </ModalHeader>
                    <ModalBody className="p-4">
                        <div
                            className="text-black-80"
                            style={{ fontSize: "15px" }}
                        >
                            <p className="text-justify text-center">
                                Sao lưu giúp lưu trữ lại nội dung ghi chú an
                                toàn, phòng khi bạn vô tình xóa mất nội dung
                                quan trọng.
                            </p>
                        </div>

                        <div className="form-group mt-4">
                            <label style={{ fontSize: "14px" }}>
                                Commit cho phiên lưu trữ
                            </label>
                            <input
                                type={"text"}
                                // value={}
                                placeholder={"nhập commit..."}
                                maxLength={255}
                                className="form-control"
                                onKeyDown={(e) => this.handleKeyDown(e)}
                                onChange={(e) => this.handleOnChangeCommit(e)}
                                autoFocus
                            />
                        </div>
                        {/* 
                        {errMsg && <ShowNoti isError={true} message={errMsg} />}
                        {okMsg && <ShowNoti isError={false} message={okMsg} />} */}
                    </ModalBody>
                    <ModalFooter className="justify-content-between">
                        <div className="float-left">
                            <Link to={"/images/upload"}>
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
                                onClick={() => isClose("upload")}
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
export default withRouter(ModalUpload);
