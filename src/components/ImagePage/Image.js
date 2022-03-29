import React from "react";
import axios from "../../configs/axios";
import { withRouter } from "react-router-dom";

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            images: [],
        };
    }
    fetchData = async (imageCode) => {
        let res = await axios.get(`/api/collection/${imageCode}`);
        // if(res.data.isPrivate)
        // {
        //     this.setState({

        //     })
        // }

        let { images } = res.data;
        this.setState({ images: images, isLoading: false });

        console.log(images);
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
        let { isLoading, images } = this.state;
        return (
            <>
                {isLoading && (
                    <div className="center">
                        <h5 className="text-center text-primary">
                            Đang tải dữ liệu...
                        </h5>
                    </div>
                )}
                {!isLoading &&
                    images.map((item, index) => (
                        <img key={index} src={item.url} alt={item.title} />
                    ))}
            </>
        );
    }
}

export default withRouter(Image);
