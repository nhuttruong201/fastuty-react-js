import moment from "moment";
import { Alert } from "reactstrap";

const ShowNoti = (props) => {
    let { isError, message } = props;
    let color = isError ? "danger" : "success";

    return (
        <Alert color={color} className="fw-bold text-center mt-2">
            {message}
            {/* {moment(new Date()).format("- hh:mm:ss A")} */}
        </Alert>
    );
};

export default ShowNoti;
