import React from "react";
import { withRouter } from "react-router-dom";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ShowNoti from "../../Notis/ShowNoti";
import axios from "axios";
class ModalCheckPassCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            errMsg: null,
        };
    }
    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleKeyEnter = (e) => {
        if (e.key === "Enter") {
            this.handleConfirmPassword();
        }
    };

    handleConfirmPassword = async () => {
        // alert("Please");
        this.setState({
            errMsg: null,
        });
        let { imageCode: code } = this.props.match.params;
        let { password } = this.state;

        if (password === "" || password.length < 4 || password.length > 20) {
            this.setState({
                errMsg: "Mật khẩu không hợp lệ",
            });
            return;
        }
        let res = await axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/api/collection/checkPassword`,
            {
                code,
                password,
            }
        );
        if (!res.data.result) {
            this.setState({
                errMsg: "Mật khẩu không đúng",
            });
            return;
        }
        this.props.configPassword(res.data.data);
    };

    handleCancel = () => {
        this.props.history.push("/image");
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
                                onKeyDown={this.handleKeyEnter}
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

export default withRouter(ModalCheckPassCollection);
