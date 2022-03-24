import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { withRouter } from "react-router-dom";
import axios from "axios";
import ShowNoti from "../../Notis/ShowNoti";

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

    handleConfirmPassword = async () => {
        this.setState({
            errMsg: null,
        });

        let code = this.props.match.params.code;
        let { password } = this.state;

        if (password === "" || password.length < 4 || password.length > 20) {
            this.setState({
                errMsg: "Mật khẩu không hợp lệ!",
            });
            return;
        }

        let res = await axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/api/note/check-password`,
            {
                code,
                password,
            }
        );

        if (!res.data.result) {
            this.setState({
                errMsg: "Mật khẩu không đúng!",
            });
            return;
        }

        //* success
        this.props.confirmedPassword(res.data.data);
    };

    handleCancel = () => {
        this.props.history.push("/note");
    };

    render() {
        let { password, errMsg } = this.state;

        return (
            <div>
                <Modal isOpen={true} centered={true} autoFocus={false}>
                    <ModalHeader
                    // toggle={function noRefCheck() {}}
                    >
                        <i className="fas fa-lock"></i> Ghi chú được bảo mật
                    </ModalHeader>
                    <ModalBody className="p-4">
                        <div className="form-group">
                            <label style={{ fontSize: "14px" }}>
                                Vui lòng nhập mật khẩu
                            </label>
                            <input
                                type={"password"}
                                value={password}
                                placeholder={"mật khẩu từ 4 - 20 ký tự"}
                                maxLength={20}
                                className="form-control mt-1"
                                onKeyDown={this.handleKeyDown}
                                onChange={(e) => this.handleOnChangePassword(e)}
                                autoFocus
                            />
                        </div>
                        {errMsg && <ShowNoti isError={true} message={errMsg} />}
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
