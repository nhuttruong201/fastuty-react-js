import "./App.css";
import { Component } from "react";

import TopBar from "./components/Views/TopBar";
import Navbar from "./components/Views/Navbar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Views/Home";
import Note from "./components/NotePages/Note";
import SearchNote from "./components/NotePages/SearchNote";
import BackupPage from "./components/NotePages/BackupPage";

import Chat from "./components/ChatPages/Chat";

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
                        {/* <h1>Note Backup</h1> */}
                        <BackupPage />
                    </Route>
                    <Route path="/chat">
                        <Chat />
                    </Route>
                    <Route path="/image">
                        {/* <Image /> */}
                        <h1>Fast image</h1>
                    </Route>
                </Switch>

                {/* <Footer /> */}
            </Router>
        );
    }
}

export default App;
