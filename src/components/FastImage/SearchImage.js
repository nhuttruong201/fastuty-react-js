import React from "react";
import { withRouter } from "react-router-dom";
class SearchImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputCode: "",
            errMsg: "",
        };
    }
    handleOnChangeInputCode = (event) => {
        this.setState({
            inputCode: event.target.value,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.inputCode === "") {
            this.setState({
                errMsg: "Bạn chưa nhập mã bộ sưu tập!",
            });
            return;
        }
        this.props.history.push("/image/" + this.state.inputCode);
        console.log("submit");
    };
    handleRandom = (e) => {
        e.preventDefault();
    };
    componentDidMount() {
        document.title = "Fast Image";
    }

    render() {
        let { inputCode, errMsg } = this.state;

        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-sm-10 col-12 ">
                        <div className="mx-auto mt-4 px-4 py-5 bg-white rounded border">
                            <h5 className="text-primary text-uppercase">
                                Fast Image
                            </h5>
                            <form>
                                <div className="form-group mt 4">
                                    {errMsg && (
                                        <p className="text-danger">{errMsg}</p>
                                    )}
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        autoFocus
                                        placeholder="nhập mã bộ sưu tập..."
                                        value={inputCode}
                                        onChange={(event) =>
                                            this.handleOnChangeInputCode(event)
                                        }
                                    />
                                </div>
                                <div className="form-group mt-3 text-center">
                                    <button
                                        className="btn btn-primary "
                                        onClick={(e) => this.handleSubmit(e)}
                                    >
                                        <i className="bi bi-images m-1"></i>
                                        Xem hoặc tạo
                                    </button>
                                    <button
                                        className="btn btn-primary m-1"
                                        onClick={(e) => {
                                            this.handleRandom(e);
                                        }}
                                    >
                                        <i className="fas fa-random"></i>
                                    </button>
                                </div>
                            </form>
                            <p
                                className="text-center p-4 text-black-50"
                                style={{ fontSize: "14px" }}
                            >
                                <span>
                                    Những người cùng mã phòng sẽ chat được với
                                    nhau.
                                </span>
                                <br></br>
                                <span>
                                    Tất cả tin nhắn sẽ biến mất sau khi cuộc trò
                                    chuyện kết thúc.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SearchImage);
