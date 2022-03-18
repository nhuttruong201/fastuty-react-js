import { useEffect, useState } from "react";
import moment from "moment";

const ShowInfo = (props) => {
    const [disName, setDisName] = useState("");
    const [message, setMessage] = useState("");

    const handleOnChangeDisName = (e) => {
        setDisName(e.target.value);
    };

    const handleOnKeyDownDisName = (e) => {
        if (e.key === "Enter") {
            handleUpdateDisplayName();
        }
    };

    const handleUpdateDisplayName = () => {
        props.setDisplayName(disName);
        setMessage(
            "Cập nhật thành công! - " + moment(new Date()).format("hh:mm:ss A")
        );
    };

    useEffect(() => {
        setDisName(props.displayName);
    }, [props]);

    return (
        <>
            <div className="offcanvas offcanvas-end" id="showInfo">
                <div className="offcanvas-header">
                    <h4 className="offcanvas-title">Thông tin về bạn</h4>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    {message && <p className="text-primary">{message}</p>}
                    <div className="form-group">
                        <label>Tên hiển thị trong nhóm chat</label>
                        <input
                            className="form-control mt-2"
                            placeholder="nhập tên hiển thị..."
                            value={disName}
                            onChange={(e) => handleOnChangeDisName(e)}
                            onKeyDown={(e) => handleOnKeyDownDisName(e)}
                        />
                    </div>
                    <div className="form-group mt-2 text-center">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => handleUpdateDisplayName()}
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowInfo;
