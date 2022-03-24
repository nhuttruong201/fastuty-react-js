import React from "react";
import { withRouter } from "react-router-dom";

class SearchNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            errMsg: null,
        };
    }

    handleChangeCode = (e) => {
        this.setState({
            code: e.target.value.trim(),
        });
    };

    handleSubmitCode = (e, page) => {
        e.preventDefault();

        let code = this.state.code;

        if (code === "") {
            this.setState({
                errMsg: "Vui lòng nhập mã ghi chú!",
            });
            return;
        }

        let route = page === "edit" ? `/note/${code}` : `/note/backup/${code}`;

        this.props.history.push(route);
    };

    componentDidMount = () => {
        document.title = "Fast Note";
    };

    render() {
        let { errMsg } = this.state;

        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-sm-10 col-12">
                        <div className="mx-auto mt-4 px-4 py-5 bg-white rounded border">
                            <h5 className="position-relative d-inline-block text-primary text-uppercase">
                                fastnote
                            </h5>
                            <form>
                                <div className="form-group mt-4">
                                    {errMsg && (
                                        <p className="text-danger">{errMsg}</p>
                                    )}
                                    <input
                                        type={"text"}
                                        value={this.state.code}
                                        autoFocus
                                        placeholder="nhập mã ghí chú..."
                                        className="form-control text-center"
                                        onChange={(e) =>
                                            this.handleChangeCode(e)
                                        }
                                    />
                                </div>
                                <div className="form-group mt-3 text-center">
                                    <button
                                        className="btn btn-primary m-1"
                                        onClick={(e) =>
                                            this.handleSubmitCode(e, "edit")
                                        }
                                    >
                                        <i className="bi bi-journals"></i> Ghi
                                        chú
                                    </button>
                                    <button
                                        className="btn btn-primary m-1"
                                        onClick={(e) =>
                                            this.handleSubmitCode(e, "backup")
                                        }
                                    >
                                        <i className="bi bi-cloud-arrow-up-fill"></i>{" "}
                                        Lưu trữ
                                    </button>
                                </div>
                            </form>
                            <p
                                className="text-center p-4 text-black-50"
                                style={{ fontSize: "14px" }}
                            >
                                <span>
                                    Mỗi mã ghi chú sẽ chứa một nội dung ghi chú
                                    riêng.
                                </span>
                                <br></br>
                                <span>
                                    Đừng quên sao lưu những ghi chú quan trọng.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SearchNote);
