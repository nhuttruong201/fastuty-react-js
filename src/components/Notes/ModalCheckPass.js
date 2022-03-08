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

class ModalCheckPass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            errMsg: null,
        };
    }

    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.handleConfirmPassword();
        }
    };

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value,
            // errMsg: null,
        });
    };

    handleConfirmPassword = () => {
        let { password } = this.state;

        if (password === "" || password.length < 4 || password.length > 20) {
            this.setState({
                errMsg: "Mật khẩu không hợp lệ!",
            });
            return;
        }

        if (password === "admin") {
            this.props.history.push("/");
        } else {
            this.setState({
                errMsg: "Mật khẩu không đúng!",
            });
        }
    };

    handleCancel = () => {
        this.props.history.push("/note");
    };

    render() {
        let { password, errMsg } = this.state;

        return (
            <div>
                <Modal isOpen={true} centered={true}>
                    <ModalHeader
                    // toggle={function noRefCheck() {}}
                    >
                        <i className="bi bi-lock-fill"></i>
                        Ghi chú được bảo mật
                    </ModalHeader>
                    <ModalBody className="p-4">
                        {errMsg ? <Alert color="danger">{errMsg}</Alert> : ""}

                        <div className="form-group">
                            <label>Vui lòng nhập mật khẩu</label>
                            <input
                                type={"password"}
                                value={password}
                                placeholder={"mật khẩu từ 4 - 20 ký tự"}
                                maxLength={20}
                                className="form-control mt-2"
                                onKeyDown={this.handleKeyDown}
                                onChange={(e) => this.handleOnChangePassword(e)}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.handleConfirmPassword()}
                        >
                            Xác nhận
                        </Button>{" "}
                        <Button onClick={() => this.handleCancel()}>Huỷ</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default withRouter(ModalCheckPass);
