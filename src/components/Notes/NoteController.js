import React from "react";
import ModalSecurity from "./ModalSecurity";

import { withRouter } from "react-router-dom";

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
        };
    }

    openModal = (modalName) => {
        console.log("Open " + modalName);

        if (modalName === "share") {
            this.setState({
                showModalShare: true,
            });
        }

        if (modalName === "backup") {
            this.setState({
                showModalBackup: true,
            });
        }

        if (modalName === "security") {
            this.setState({
                showModalSecurity: true,
            });
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
        // console.log(this.state.inputCode);
        let inputCode = this.state.inputCode;
        // this.props.history.push("/note/" + inputCode);
        this.props.submitCode(inputCode);
    };

    componentDidMount() {
        this.setState({
            currentCode: this.props.code,
            inputCode: this.props.match.params.code,
            password: this.props.password,
        });
    }

    render() {
        // console.log(this.state);
        let { showModalBackup, showModalSecurity, showModalShare } = this.state;
        let { password, inputCode } = this.state;

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
                                    <i className="bi bi-search"></i>
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

                            {showModalSecurity ? (
                                <ModalSecurity
                                    isShow={showModalSecurity}
                                    isClose={this.closeModal}
                                    password={password}
                                    updatePassword={this.handleUpdatePassword}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(NoteController);
