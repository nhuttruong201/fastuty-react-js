import React from "react";
import axios from "../../configs/axios";
import { withRouter } from "react-router-dom";

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }
    fetchData = async (imageCode) => {
        let res = await axios.get(`/api/collection/${imageCode}`);
        // if(res.data.isPrivate)
        // {
        //     this.setState({

        //     })
        // }
        console.log(res);
    };

    async componentDidMount() {
        let { imageCode } = this.props.match.params;
        console.log(imageCode);
        document.title = `Fast Image - ${imageCode}`;
        // setTimeout(() => {
        //     this.setState({ isLoading: false });
        // }, 2000);
        await this.fetchData(imageCode);
    }

    render() {
        let { isLoading } = this.state;
        return (
            <>
                {isLoading && (
                    <div className="center">
                        <h5 className="text-center text-primary">
                            Đang tải dữ liệu...
                        </h5>
                    </div>
                )}
                {!isLoading && <></>}
            </>
        );
    }
}

export default withRouter(Image);
