import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ShowNoti from "../../Notis/ShowNoti";
class ModalDeleteImage extends React.Component {
    state = {
        isOnPassword: false,
        okMsg: "",
        errMsg: "",
    };

    handleDeleteImage = () => {
        // alert("Delete image");
        // let { imageCode: code } = this.props.match.params;
        let { data } = this.props;

        console.log(">>> check props data delete: ", data);

        axios
            .put(
                `${process.env.REACT_APP_API_ENDPOINT}/api/images/delete-image`,
                {
                    _id: data._idImage,
                }
            )
            .then((res) => {
                console.log("handle Delete image: ", res);
                if (res.status === 200) {
                    this.setState({
                        okMsg: "delete image successfully",
                        errMsg: null,
                    });
                    this.props.updateImage();
                    return;
                }
                this.setState({
                    okMsg: null,
                    errMsg: "delete image failed",
                });
            })
            .catch((err) => {
                console.log("Delete err: ", err);
                this.setState({
                    okMsg: null,
                    errMsg: "delete image failed",
                });
            });
    };

    render() {
        let { isShow, isClose, data } = this.props;
        let { errMsg, okMsg } = this.state;
        console.log(">> check props data delete: ", data);
        return (
            <div>
                <Modal isOpen={isShow} centered={true}>
                    <ModalHeader>
                        <i className="bi bi-trash3"></i>
                        Bạn có chắc xoá?
                    </ModalHeader>
                    <ModalBody>
                        <div className="modal-content">
                            <div className="modal-body">
                                <img
                                    src={data.urlImage}
                                    alt={data.title}
                                    width="450px"
                                    height="250px"
                                />
                            </div>
                            <p className="text-center ">
                                cân nhắc kỹ trước khi thực hiện!
                            </p>
                        </div>
                        {errMsg && <ShowNoti isError={true} message={errMsg} />}
                        {okMsg && <ShowNoti isError={false} message={okMsg} />}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-sm"
                            color="primary"
                            onClick={() => this.handleDeleteImage()}
                        >
                            Xóa
                        </Button>{" "}
                        <Button
                            className="btn-sm"
                            onClick={() => isClose("delete")}
                        >
                            Đóng
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default withRouter(ModalDeleteImage);
