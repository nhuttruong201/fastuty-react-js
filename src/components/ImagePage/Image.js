import React from "react";
import axios from "../../configs/axios";
import { withRouter } from "react-router-dom";
import Background from "./images/banner.jpg";
import "./style.css";
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
                {!isLoading && (
                    <>
                        <div>
                            <section id="features" className="features">
                                <div className="container">
                                    <div className="row mt-3">
                                        <div className="sec-title text-center mb50 wow bounceInDown animated">
                                            <h2 className="text-uppercase text-success">
                                                Picture
                                            </h2>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="50px"
                                                height="50px"
                                                fill="currentColor"
                                                className="bi bi-valentine"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132ZM2.25 4a.25.25 0 0 0-.25.25v1.5a.25.25 0 0 0 .5 0V4.5h1.25a.25.25 0 0 0 0-.5h-1.5Zm10 0a.25.25 0 1 0 0 .5h1.25v1.25a.25.25 0 1 0 .5 0v-1.5a.25.25 0 0 0-.25-.25h-1.5ZM2.5 10.25a.25.25 0 1 0-.5 0v1.5c0 .138.112.25.25.25h1.5a.25.25 0 1 0 0-.5H2.5v-1.25Zm11.5 0a.25.25 0 1 0-.5 0v1.25h-1.25a.25.25 0 1 0 0 .5h1.5a.25.25 0 0 0 .25-.25v-1.5Z" />
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M0 2.994v-.06a1 1 0 0 1 .859-.99l13-1.857a1 1 0 0 1 1.141.99V2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2.994ZM1 3v10h14V3H1Z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <form>
                                <div className="form-group mt-2 text-center">
                                    <button className="btn btn-primary m-1">
                                        <i className="bi bi-upload mx-1"></i>
                                        Tải lên
                                    </button>
                                    <button className="btn btn-primary m-1">
                                        <i className="bi bi-lock-fill mx-1"></i>
                                        Bảo mật
                                    </button>
                                    <button className="btn btn-primary m-1">
                                        <i className="bi bi-share-fill mx-1"></i>
                                        Shared
                                    </button>
                                </div>
                            </form>
                            <div className="project-wrapper">
                                {images.map((item, index) => (
                                    <figure className="mix work-item branding">
                                        <img
                                            key={index}
                                            src={item.url}
                                            alt={item.title}
                                        />
                                        <figcaption className="overlay">
                                            <>
                                                {images.map((item, index) => (
                                                    <div>
                                                        <a
                                                            className="fancybox"
                                                            rel="works"
                                                            key={index}
                                                            href={item.url}
                                                            title={item.title}
                                                        >
                                                            <i className="fa fa-eye fa-lg"></i>
                                                        </a>
                                                        <br></br>
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                ))}
                                            </>
                                        </figcaption>
                                    </figure>
                                ))}
                                <figure className="mix work-item branding">
                                    <img
                                        src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/11/2-20.jpg"
                                        alt=""
                                    />
                                    <figcaption className="overlay">
                                        <a
                                            className="fancybox"
                                            rel="works"
                                            title="Write Your Image Caption Here"
                                            href="https://cellphones.com.vn/sforum/wp-content/uploads/2021/11/2-20.jpg"
                                        >
                                            <i className="fa fa-eye fa-lg"></i>
                                        </a>
                                        <h4>Labore et dolore magnam</h4>
                                        <p>Photography</p>
                                    </figcaption>
                                </figure>
                                <figure className="mix work-item branding">
                                    <img
                                        src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/11/2-20.jpg"
                                        alt=""
                                    />
                                    <figcaption className="overlay">
                                        <a
                                            className="fancybox"
                                            rel="works"
                                            title="Write Your Image Caption Here"
                                            href="https://cellphones.com.vn/sforum/wp-content/uploads/2021/11/2-20.jpg"
                                        >
                                            <i className="fa fa-eye fa-lg"></i>
                                        </a>
                                        <h4>Labore et dolore magnam</h4>
                                        <p>Photography</p>
                                    </figcaption>
                                </figure>
                                <figure className="mix work-item branding">
                                    <img
                                        src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/11/2-20.jpg"
                                        alt=""
                                    />
                                    <figcaption className="overlay">
                                        <a
                                            className="fancybox"
                                            rel="works"
                                            title="Write Your Image Caption Here"
                                            href="https://cellphones.com.vn/sforum/wp-content/uploads/2021/11/2-20.jpg"
                                        >
                                            <i className="fa fa-eye fa-lg"></i>
                                        </a>
                                        <h4>Labore et dolore magnam</h4>
                                        <p>Photography</p>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default withRouter(Image);
