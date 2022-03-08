import React from "react";

class ImageItem extends React.Component {
    render() {
        let { url, title } = this.props;

        return (
            <div>
                <img
                    src={url}
                    title={title}
                    alt={title}
                    height="100"
                    width="200"
                />
            </div>
        );
    }
}

export default ImageItem;
