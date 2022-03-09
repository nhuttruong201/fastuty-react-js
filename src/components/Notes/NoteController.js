import React from "react";
import ModalSecurity from "./ModalSecurity";

class NoteController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalShare: false,
            showModalBackup: false,
            showModalSecurity: false,
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

    componentDidMount() {
        this.setState({
            password: this.props.password,
        });
    }

    render() {
        console.log(this.state);
        let { showModalBackup, showModalSecurity, showModalShare } = this.state;
        let { password } = this.state;

        return (
            <>
                <div className="mt-5 pt-2 text-center">
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
            </>
        );
    }
}

export default NoteController;
