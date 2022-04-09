import React from "react";
import axios from "axios";
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ShowNoti from "../../Notis/ShowNoti";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
class ModalShare extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShared: this.props.isShared,
            okMsg: null,
            errMsg: null,
        };
    }

    handleChangeStateShare = async (e) => {
        let isChecked = e.target.checked;
        console.log("handleChangeStateShare: ", isChecked);

        await axios
            .put(API_ENDPOINT + "/api/note/update-share-state", {
                code: this.props.code,
                password: this.props.password,
                isShared: isChecked,
            })
            .then((res) => {
                console.log(res);
                this.setState({
                    isShared: isChecked,
                    errMsg: null,
                    okMsg:
                        "Đã " +
                        (isChecked ? " bật " : " Tắt ") +
                        " chế độ chia sẻ!",
                });

                this.props.updateShareState(isChecked);
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    okMsg: null,
                    errMsg: "Đã xảy ra lỗi!",
                });
            });
    };

    handleCopyLinkShare = () => {
        let linkShare =
            window.location.origin + "/note/share/" + this.props.code;
        // console.log(linkShare);
        navigator.clipboard.writeText(linkShare);
        this.setState({
            errMsg: null,
            okMsg: "Đã sao chép link chia sẻ",
        });
    };

    componentDidMount() {
        this.setState({
            isShared: this.props.isShared,
        });
    }

    render() {
        let { isShared, okMsg, errMsg } = this.state;
        let { isClose } = this.props;

        console.log("Check isShared from modal share note: ", isShared);

        return (
            <div>
                <Modal isOpen={true} centered={true} autoFocus={false}>
                    <ModalHeader>
                        <i className="fas fa-share"></i> Chia sẻ ghi chú
                    </ModalHeader>
                    <ModalBody className="p-4">
                        <div
                            className="text-black-80"
                            style={{ fontSize: "15px" }}
                        >
                            <p className="text-justify text-center text-black-80">
                                Chế độ chia sẻ cho phép
                                <strong> bất kỳ ai </strong>
                                có kết nối internet và truy cập vào{" "}
                                <strong>liên kết chia sẻ </strong>
                                đều có thể xem nội dung.
                            </p>
                        </div>

                        <div className="mid">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultChecked={isShared}
                                    onClick={(e) =>
                                        this.handleChangeStateShare(e)
                                    }
                                />
                                <label className="form-check-label">
                                    Chế độ chia sẻ
                                </label>
                            </div>
                        </div>

                        {errMsg && <ShowNoti isError={true} message={errMsg} />}
                        {okMsg && <ShowNoti isError={false} message={okMsg} />}
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => this.handleCopyLinkShare()}
                        >
                            <i className="fas fa-link"></i> Nhận liên kết chia
                            sẻ
                        </button>
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => isClose("share")}
                        >
                            Đóng
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalShare;
