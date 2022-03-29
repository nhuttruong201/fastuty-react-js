import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Views/Navbar";
import Home from "./components/Views/Home";
import Note from "./components/NotePages/Note";
import SearchNote from "./components/NotePages/SearchNote";
import BackupPage from "./components/NotePages/BackupPage";

import Chat from "./components/ChatPages/Chat";
import SharePage from "./components/NotePages/SharePage";
import SearchChatRoom from "./components/ChatPages/SearchChatRoom";
import SearchImage from "./components/FastImage/SearchImage";
import Image from "./components/ImagePage/Image";

class App extends Component {
    render() {
        return (
            <Router>
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
                        <BackupPage />
                    </Route>
                    <Route path="/note/share/:code" exact>
                        <SharePage />
                    </Route>
                    <Route path="/chat" exact>
                        <SearchChatRoom />
                    </Route>
                    <Route path="/chat/:roomId" exact>
                        <Chat />
                    </Route>
                    <Route path="/image" exact>
                        <SearchImage />
                    </Route>
                    <Route path="/image/:imageCode" exact>
                        <Image />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
