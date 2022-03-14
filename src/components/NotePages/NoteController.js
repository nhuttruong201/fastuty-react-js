import React from "react";
import { withRouter } from "react-router-dom";

import ModalSecurity from "./Modals/ModalSecurity";
import ModalBackup from "./Modals/ModalBackup";
import ModalShare from "./Modals/ModalShare";

class NoteController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalShare: false,
            showModalBackup: false,
            showModalSecurity: false,
            currentCode: "",
            inputCode: "",
            password: "",
            isShared: false,
        };
    }

    openModal = (modalName) => {
        console.log("Open " + modalName);

        if (modalName === "share") {
            this.setState({
                showModalShare: true,
            });
            return;
        }

        if (modalName === "backup") {
            this.setState({
                showModalBackup: true,
            });
            return;
        }

        if (modalName === "security") {
            this.setState({
                showModalSecurity: true,
            });
            return;
        }
    };

    closeModal = (modalName) => {
        console.log("handleCloseModal: ", modalName);

        if (modalName === "share") {
            this.setState({
                showModalShare: false,
            });
        }

        if (modalName === "backup") {
            this.setState({
                showModalBackup: false,
            });
        }

        if (modalName === "security") {
            this.setState({
                showModalSecurity: false,
            });
        }
    };

    handleUpdatePassword = (newPassword) => {
        this.setState({
            password: newPassword,
        });
    };

    handleOnChangeInputCode = (e) => {
        this.setState({
            inputCode: e.target.value,
        });
    };

    handleOnKeyDownInputCode = (e) => {
        // console.log(e.key);
        if (e.key === "Enter") {
            this.handleSubmitCode();
        }
    };

    handleSubmitCode = () => {
        let inputCode = this.state.inputCode;
        this.props.submitCode(inputCode);
    };

    componentDidMount() {
        this.setState({
            isShared: this.props.isShared,
            currentCode: this.props.code,
            inputCode: this.props.match.params.code,
            password: this.props.password,
        });
    }

    render() {
        let { showModalBackup, showModalSecurity, showModalShare } = this.state;
        let { password, inputCode, isShared } = this.state;

        console.log("Check isShared from controller: ", isShared);

        return (
            <>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-sm-10 col-12 mt-5">
                            <div className="input-group pt-2">
                                <input
                                    type="text"
                                    value={inputCode}
                                    className="form-control text-center border-radius-top-left border-radius-bottom-left"
                                    placeholder="mã ghi chú"
                                    onChange={this.handleOnChangeInputCode}
                                    onKeyDown={this.handleOnKeyDownInputCode}
                                />
                                <button
                                    className="btn btn-primary border-radius-top-right border-radius-bottom-right"
                                    onClick={this.handleSubmitCode}
                                >
                                    <i className="bi bi-search"></i> Tìm
                                </button>
                            </div>
                            <div className="pt-2 text-center">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => this.openModal("share")}
                                >
                                    <i className="fas fa-share"></i>
                                    &nbsp;Chia sẻ
                                </button>
                                <button
                                    className="btn btn-sm btn-primary mx-2"
                                    onClick={() => this.openModal("backup")}
                                >
                                    <i className="fas fa-upload"></i>
                                    &nbsp;Sao lưu
                                </button>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => this.openModal("security")}
                                >
                                    <i className="fas fa-lock"></i>
                                    &nbsp;Bảo mật
                                </button>
                            </div>

                            {showModalSecurity && (
                                <ModalSecurity
                                    isShow={showModalSecurity}
                                    isClose={this.closeModal}
                                    password={password}
                                    updatePassword={this.handleUpdatePassword}
                                />
                            )}

                            {showModalBackup && (
                                <ModalBackup
                                    isShow={showModalBackup}
                                    isClose={this.closeModal}
                                    password={password}
                                />
                            )}

                            {showModalShare && (
                                <ModalShare
                                    isShow={showModalShare}
                                    isClose={this.closeModal}
                                    isShared={this.props.isShared}
                                    updateShareState={
                                        this.props.updateShareState
                                    }
                                    password={password}
                                    code={this.props.code}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(NoteController);
