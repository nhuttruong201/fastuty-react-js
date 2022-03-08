import "./App.css";
import { Component } from "react";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import About from "./components/About";
import Footer from "./components/Footer";
import ImageItem from "./components/ImageItem";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Note from "./components/Notes/Note";
import Chat from "./components/Chat";
import Image from "./components/Image";
import ListUser from "./components/Users/ListUser";
import DetailUser from "./components/Users/DetailUser";
import SearchNote from "./components/Notes/SearchNote";

class App extends Component {
    componentDidMount = () => {
        // console.log("componentDidMount()");
    };

    render() {
        // console.log("Render");
        return (
            <Router>
                <TopBar />
                <Navbar clickToNote={this.handlePageNote} />

                <Switch>
                    <Route path="/users" exact>
                        <ListUser />
                    </Route>
                    <Route path="/users/:id">
                        <DetailUser />
                    </Route>

                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/note" exact>
                        <SearchNote />
                    </Route>
                    <Route path="/note/:code">
                        <Note />
                    </Route>
                    <Route path="/chat">
                        <Chat />
                    </Route>
                    <Route path="/image">
                        <Image />
                    </Route>
                </Switch>

                {/* <Footer /> */}
            </Router>
        );
    }
}

export default App;
