import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ShowNoti from "../../Notis/ShowNoti";

class ModalSecurity extends React.Component {
    state = {
        isOnPassword: false,
        password: "",
        errMsg: null,
        okMsg: null,
    };

    handleChangeStatePass = (e) => {
        let isChecked = e.target.checked;

        this.setState({
            isOnPassword: isChecked,
            password: isChecked ? this.state.password : "",
        });
    };

    onChangePassword = (e) => {
        console.log(this.state.password);
        this.setState({
            password: e.target.value,
        });
    };

    handleUpdatePassword = () => {
        let { imageCode: code } = this.props.match.params;
        let { password, isOnPassword } = this.state;

        if (
            (password === "" && isOnPassword) ||
            (password.length < 4 && isOnPassword) ||
            (password.length > 20 && isOnPassword)
        ) {
            this.setState({
                errMsg: "Mật khẩu không hợp lệ",
                okMsg: null,
            });
            return;
        }
        axios
            .put(
                `${process.env.REACT_APP_API_ENDPOINT}/api/collection/update-password`,
                {
                    code,
                    password,
                }
            )
            .then((res) => {
                console.log("res from update pass: ", res);
                if (res.status === 200) {
                    this.setState({
                        okMsg:
                            password === ""
                                ? "Đã tắt mật khẩu!"
                                : "Cập nhật thành công!",
                        errMsg: null,
                    });
                    this.props.updatePassword(password);
                    return;
                }
                this.setState({
                    okMsg: null,
                    errMsg: "Đã xảy ra lỗi!",
                });
            })
            .catch((err) => {
                console.log("err from update pass:", err);
                this.setState({
                    okMsg: null,
                    errMsg: "Đã xảy ra lỗi!",
                });
            });
    };
    componentDidMount() {
        let { password: propPassword } = this.props;
        console.log("Props pass: ", propPassword);

        this.setState({
            isOnPassword: propPassword === "" ? false : true,
            password: propPassword,
        });
    }
    render() {
        let { isShow, isClose } = this.props;
        let { isOnPassword, password, errMsg, okMsg } = this.state;
        return (
            <div>
                <Modal isOpen={isShow} centered={true}>
                    <ModalHeader>
                        <i className="fas fa-lock"></i> Bảo mật bộ sưu tập
                    </ModalHeader>
                    <ModalBody className="p-4">
                        <div
                            className="text-black-80"
                            style={{ fontSize: "15px" }}
                        >
                            <p className="text-justify text-center">
                                Khi đặt mật khẩu, bạn cần xác thực trước khi đi
                                đến bộ sưu tập. Thay đổi sẽ có hiệu lực từ lần
                                truy cập tiếp theo.
                            </p>
                        </div>
                        <div className="mid">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultChecked={isOnPassword}
                                    onClick={(e) =>
                                        this.handleChangeStatePass(e)
                                    }
                                />
                                <label className="form-check-label">
                                    Mật khẩu
                                </label>
                            </div>
                        </div>

                        {!isOnPassword ? null : (
                            <div className="form-group mt-4">
                                <input
                                    type={"password"}
                                    value={password}
                                    placeholder={"mật khẩu từ 4 - 20 ký tự"}
                                    maxLength={20}
                                    className="form-control"
                                    onChange={(e) => this.onChangePassword(e)}
                                />
                            </div>
                        )}
                        {errMsg && <ShowNoti isError={true} message={errMsg} />}
                        {okMsg && <ShowNoti isError={false} message={okMsg} />}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-sm"
                            color="primary"
                            onClick={() => this.handleUpdatePassword()}
                        >
                            <i className="bi bi-gear"></i> Cập nhật
                        </Button>{" "}
                        <Button
                            className="btn-sm"
                            onClick={() => isClose("security")}
                        >
                            Đóng
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default withRouter(ModalSecurity);
