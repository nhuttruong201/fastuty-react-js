import React from "react";
import { Link } from "react-router-dom";

class BackupController extends React.Component {
    render() {
        let { code } = this.props;
        return (
            <>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-sm-10 col-12">
                            {/* <div className="input-group pt-2">
                                <input
                                    type="text"
                                    // value={inputCode}
                                    className="form-control text-center border-radius-top-left border-radius-bottom-left"
                                    placeholder="mã ghi chú"
                                    onChange={this.handleOnChangeInputCode}
                                    onKeyDown={this.handleOnKeyDownInputCode}
                                />
                                <button
                                    className="btn btn-primary border-radius-top-right border-radius-bottom-right"
                                    onClick={this.handleSubmitCode}
                                >
                                    <i className="bi bi-search"></i> Tìm
                                </button>
                            </div> */}
                            <div className="pt-2 text-center mt-2">
                                <Link to={"/note/" + code}>
                                    <button className="btn btn-sm btn-primary">
                                        <i className="bi bi-journals"></i>
                                        &nbsp;Nội dung hiện tại
                                    </button>
                                </Link>
                                <Link to={"/note"}>
                                    <button className="btn btn-sm btn-primary mx-2">
                                        <i className="fas fa-plus"></i>
                                        &nbsp;Tạo ghi chú mới
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default BackupController;
