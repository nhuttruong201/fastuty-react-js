import "./App.css";
import { Component } from "react";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Note from "./components/Notes/Note";
import Chat from "./components/Chat";
import Image from "./components/Image";
import SearchNote from "./components/Notes/SearchNote";

class App extends Component {
    render() {
        return (
            <Router>
                <TopBar />
                <Navbar clickToNote={this.handlePageNote} />

                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/note" exact>
                        <SearchNote />
                    </Route>
                    <Route path="/note/:code" exact>
                        <Note />
                    </Route>
                    <Route path="/note/backup/:code" exact>
                        <h1>Note Backup</h1>
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
