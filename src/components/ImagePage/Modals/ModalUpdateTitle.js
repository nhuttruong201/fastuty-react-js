import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ShowNoti from "../../Notis/ShowNoti";
class ModalUploadTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            inputTitle: "",
            okMsg: "",
            errMsg: "",
        };
    }
    handleOnchangeTitle = (e) => {
        this.setState({
            inputTitle: e.target.value,
        });
    };

    handleUpdateTitle = () => {
        let { data } = this.props;
        let { inputTitle } = this.state;
        console.log("Check props title: ", data);

        if (inputTitle === "") {
            this.setState({
                errMsg: "Không để trống",
            });
            return;
        }
        axios
            .put(
                `${process.env.REACT_APP_API_ENDPOINT}/api/images/update-title`,
                {
                    _id: data._idImage,
                    title: inputTitle,
                }
            )
            .then((res) => {
                console.log("Handle update title: ", res);
                if (res.status === 200) {
                    this.setState({
                        okMsg: "Success",
                        errMsg: null,
                    });

                    this.props.updateSucceed();

                    return;
                }
                this.setState({
                    okMsg: null,
                    errMsg: "Update fail!",
                });
            })
            .catch((err) => {
                this.setState({
                    okMsg: null,
                    errMsg: "Update fail!",
                });
            });
    };

    render() {
        let { isShow, isClose, data } = this.props;
        let { inputTitle, okMsg, errMsg } = this.state;
        console.log(">> check props data: ", data);
        return (
            <div>
                <Modal isOpen={isShow} centered={true}>
                    <ModalHeader>
                        <i className="bi bi-pencil-fill"></i> Thay đổi tiêu đề
                        hình ảnh
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <label className="m-2">
                                        Tiêu đề hình ảnh
                                    </label>
                                    <textarea
                                        className="form-control"
                                        placeholder={data.titleUpdate}
                                        value={inputTitle}
                                        onChange={(e) =>
                                            this.handleOnchangeTitle(e)
                                        }
                                    />
                                </div>
                                <div className="col-6">
                                    <img src={data.urlImage} alt={data.title} />
                                </div>
                            </div>
                        </div>
                        {errMsg && <ShowNoti isError={true} message={errMsg} />}
                        {okMsg && <ShowNoti isError={false} message={okMsg} />}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-sm"
                            color="primary"
                            onClick={() => this.handleUpdateTitle()}
                        >
                            <i className="bi bi-gear"></i> Cập nhật
                        </Button>{" "}
                        <Button
                            className="btn-sm"
                            onClick={() => isClose("updateTitle")}
                        >
                            Đóng
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default withRouter(ModalUploadTitle);
