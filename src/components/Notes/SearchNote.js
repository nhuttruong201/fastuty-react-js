import React from "react";
import { withRouter } from "react-router-dom";

class SearchNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            errMsg: null,
        };

        this.txtPassword = React.createRef();
    }

    handleChangeCode = (e) => {
        this.setState({
            code: e.target.value,
        });
    };

    handleSubmitCode = (e) => {
        e.preventDefault();

        if (this.state.code === "") {
            this.setState({
                errMsg: "Vui lòng nhập mã ghi chú!",
            });
            return;
        }

        this.props.history.push(`/note/${this.state.code}`);
    };

    componentDidMount = () => {
        document.title = "Fast Note";
        this.txtPassword.current.focus();
    };

    render() {
        let { errMsg } = this.state;

        return (
            <div className="">
                <div
                    className="mx-auto mt-4 p-4 bg-white"
                    style={{ width: "400px" }}
                >
                    <form>
                        <div className="form-group">
                            {errMsg ? (
                                <p className="text-danger">
                                    <i className="bi bi-exclamation-diamond-fill"></i>{" "}
                                    {errMsg}
                                </p>
                            ) : null}
                            {/* <label>Mã ghi chú</label> */}
                            <input
                                type={"text"}
                                value={this.state.code}
                                placeholder="nhập mã ghí chú..."
                                className="form-control"
                                ref={this.txtPassword}
                                onChange={(e) => this.handleChangeCode(e)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <button
                                className="btn btn-block btn-primary me-3 animated"
                                onClick={(e) => this.handleSubmitCode(e)}
                            >
                                Xem hoặc tạo mới
                            </button>
                        </div>
                    </form>
                </div>
                <p className="text-center p-4" style={{ fontSize: "13px" }}>
                    <span>
                        Mỗi mã ghi chú sẽ chứa một nội dung ghi chú riêng.
                    </span>
                    <br></br>
                    <span>Đừng quên sao lưu những ghi chú quan trọng.</span>
                </p>
            </div>
        );
    }
}

export default withRouter(SearchNote);
