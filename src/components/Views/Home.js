import React from "react";
import About from "./About";
import Carousel from "./Carousel";

class Home extends React.Component {
    componentDidMount() {
        document.title = "Fast Uty - Home";
    }
    render() {
        return (
            <>
                <Carousel />
                <About />
            </>
        );
    }
}

export default Home;
