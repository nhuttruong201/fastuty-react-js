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
                                    Giới thiệu
                                </h5>
                                <h1 className="display-5 mb-0">
                                    The World's Best Dental Clinic That You Can
                                    Trust
                                </h1>
                            </div>
                            <h4 className="text-body fst-italic mb-4">
                                Diam dolor diam ipsum sit. Clita erat ipsum et
                                lorem stet no lorem sit clita duo justo magna
                                dolore
                            </h4>
                            <p className="mb-4">
                                Tempor erat elitr rebum at clita. Diam dolor
                                diam ipsum et tempor sit. Aliqu diam amet diam
                                et eos labore. Clita erat ipsum et lorem et sit,
                                sed stet no labore lorem sit. Sanctus clita duo
                                justo et tempor eirmod magna dolore erat amet
                            </p>
                            <div className="row g-3">
                                <div
                                    className="col-sm-6 wow zoomIn"
                                    data-wow-delay="0.3s"
                                >
                                    <h5 className="mb-3">
                                        <i className="fa fa-check-circle text-primary me-3" />
                                        Award Winning
                                    </h5>
                                    <h5 className="mb-3">
                                        <i className="fa fa-check-circle text-primary me-3" />
                                        Professional Staff
                                    </h5>
                                </div>
                                <div
                                    className="col-sm-6 wow zoomIn"
                                    data-wow-delay="0.6s"
                                >
                                    <h5 className="mb-3">
                                        <i className="fa fa-check-circle text-primary me-3" />
                                        24/7 Opened
                                    </h5>
                                    <h5 className="mb-3">
                                        <i className="fa fa-check-circle text-primary me-3" />
                                        Fair Prices
                                    </h5>
                                </div>
                            </div>
                            {/* <a
                                href="appointment.html"
                                className="btn btn-primary py-3 px-5 mt-4 wow zoomIn"
                                data-wow-delay="0.6s"
                            >
                                Make Appointment
                            </a> */}
                        </div>
                        <div
                            className="col-lg-5"
                            style={{ minHeight: "500px" }}
                        >
                            <div className="position-relative h-100">
                                <img
                                    className="position-absolute w-100 h-100 rounded wow zoomIn"
                                    data-wow-delay="0.9s"
                                    src="https://vnn-imgs-a1.vgcloud.vn/cdn.24h.com.vn/upload/3-2019/images/2019-09-22/1569088344-560-1-1569052420-width650height813.jpg"
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
