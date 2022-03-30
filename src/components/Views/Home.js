import React from "react";

class Home extends React.Component {
    componentDidMount() {
        document.title = "Fast Uty - Home";
    }
    render() {
        return (
            <div
                className="container-fluid py-5 wow fadeInUp"
                data-wow-delay="0.1s"
            >
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-7">
                            <div className="section-title mb-4">
                                <h5 className="position-relative d-inline-block text-primary text-uppercase">
                                    Về Fast Uty
                                </h5>
                                <h1 className="display-5 mb-0 ">
                                    Tiện ích nhanh cho bạn
                                </h1>
                            </div>
                            <h5 className="text-body fst-italic mb-4">
                                Tiêu chí của chúng tôi là mang đến cho người
                                dùng một website cung cấp các tiện ích nhanh
                                như: nhắn tin, lưu trữ tài liệu văn bản và lưu
                                trữ hình ảnh nhanh chống và tiện lợi
                            </h5>

                            <div className="row g-3">
                                <div
                                    className="col-sm-6 wow zoomIn"
                                    data-wow-delay="0.3s"
                                >
                                    <h5 className="mb-3">
                                        <i className="fa fa-check-circle text-primary me-3" />
                                        Tiện lợi
                                    </h5>
                                    <h5 className="mb-3">
                                        <i className="fa fa-check-circle text-primary me-3" />
                                        Nhanh chóng
                                    </h5>
                                </div>
                                <div
                                    className="col-sm-6 wow zoomIn"
                                    data-wow-delay="0.6s"
                                >
                                    <h5 className="mb-3">
                                        <i className="fa fa-check-circle text-primary me-3" />
                                        Dễ dàng
                                    </h5>
                                    <h5 className="mb-3">
                                        <i className="fa fa-check-circle text-primary me-3" />
                                        Thân thiện
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-5"
                            style={{ minHeight: "500px" }}
                        >
                            <div className="position-relative h-100">
                                <img
                                    className="position-absolute w-100 h-100 rounded wow zoomIn"
                                    data-wow-delay="0.9s"
                                    src="/img/bg.jpg"
                                    alt=""
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
