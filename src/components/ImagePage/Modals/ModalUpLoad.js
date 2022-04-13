import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ShowNoti from "../../Notis/ShowNoti";
import { withRouter } from "react-router-dom";
import "./uploadImage.css";
import axios from "axios";
class ModalUpload extends React.Component {
    state = {
        errMsg: "",
        okMsg: "",
    };
    handleUploadImage = async (e) => {
        this.setState({
            okMsg: "Đang tải ảnh lên...",
        });
        // alert("ok");
        let files = e.target.files;
        var formData = new FormData();
        formData.append("image", files[0]);

        let { imageCode: code } = this.props.match.params;
        // console.log(this.props.match.params);

        await axios
            .post("https://api.imgur.com/3/image", formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: "Client-ID 58f2ebf29687a0b",
                },
                responseType: "json",
            })
            .then(async (data) => {
                let link = data.data.data.link;
                let title = data.data.data.id;
                console.log(">> check data imgur api: ", data);

                let res = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/api/images/upload`,
                    {
                        code: code,
                        title: title,
                        url: link,
                    }
                );
                this.props.uploadSuccess(res);
                return;
            })
            .catch((err) => {
                console.log("Check err Upload Image", err);
            });
    };

    render() {
        let { errMsg, okMsg } = this.state;
        let { isClose } = this.props;
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader>
                        <span className="text-black h5">Tải ảnh lên</span>
                    </ModalHeader>
                    <ModalBody className="p-4 ">
                        {errMsg && <ShowNoti isError={true} message={errMsg} />}
                        {okMsg && <ShowNoti isError={false} message={okMsg} />}
                    </ModalBody>

                    <ModalBody className="">
                        <div className="modal-body">
                            <div className="form-group">
                                <form
                                    id="file-upload-form"
                                    className="uploader"
                                >
                                    <input
                                        id="file-upload"
                                        type="file"
                                        name="fileUpload"
                                        accept="image/*"
                                        // multiple
                                        onChange={(e) =>
                                            this.handleUploadImage(e)
                                        }
                                    />
                                    <label htmlFor="file-upload" id="file-drag">
                                        <img
                                            id="file-image"
                                            src="#"
                                            alt="Preview"
                                            className="hidden"
                                        />
                                        <div id="start">
                                            <i
                                                className="fa fa-download"
                                                aria-hidden="true"
                                            />
                                            <div>
                                                Chọn ảnh hoặc kéo thả vào đây
                                            </div>
                                            <div
                                                id="notimage"
                                                className="hidden"
                                            />
                                            <span
                                                id="file-upload-btn"
                                                className="btn btn-primary"
                                            >
                                                Chọn ảnh
                                            </span>
                                        </div>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="justify-content-right">
                        <div className="float-right">
                            {/* <Button
                                className="btn-sm"
                                color="primary"
                                onClick={(e) => this.handleUploadImage(e)}
                            >
                                Tải lên
                            </Button>{" "} */}
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => isClose("upload")}
                            >
                                Đóng
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default withRouter(ModalUpload);
