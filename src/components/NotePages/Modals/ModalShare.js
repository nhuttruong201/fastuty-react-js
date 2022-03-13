import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class ModalShare extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShared: this.props.isShared,
        };
    }

    componentDidMount() {
        this.setState({
            isShared: this.props.isShared,
        });
    }

    render() {
        let { isShared } = this.state;
        let { isClose } = this.props;

        console.log("Check isShared: ", isShared);

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
                            <p className="text-justify text-black-80">
                                <i className="bi bi-info-circle text-info"></i>{" "}
                                Chế độ chia sẻ cho phép{" "}
                                <strong>bất kỳ ai </strong>
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

                        {/* {errMsg ? (
                            <Alert color="danger mt-2">
                                <i className="bi bi-exclamation-diamond-fill"></i>{" "}
                                {errMsg}
                            </Alert>
                        ) : null}
                        {okMsg ? (
                            <Alert color="success mt-2">
                                <i className="bi bi-check2-circle"></i> {okMsg}
                            </Alert>
                        ) : null} */}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary btn-sm">
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
