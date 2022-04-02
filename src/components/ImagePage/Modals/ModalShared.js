import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
class ModalShared extends React.Component {
    render() {
        let { isClose } = this.props;
        return (
            <Modal isOpen={true} centered={true} autoFocus={false}>
                <ModalHeader>
                    <i className="fas fa-share"></i> Chia sẻ ghi chú
                </ModalHeader>
                <ModalBody className="p-4">
                    <div className="text-black-80" style={{ fontSize: "15px" }}>
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
                            />
                            <label className="form-check-label">
                                Chế độ chia sẻ
                            </label>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => this.handleCopyLinkShare()}
                    >
                        <i className="fas fa-link"></i> Nhận liên kết chia sẻ
                    </button>
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => isClose("share")}
                    >
                        Đóng
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
}
export default ModalShared;
