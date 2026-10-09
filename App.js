import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Inbox from "./pages/Inbox";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GenerateLink from "./components/GenerateLink";
import Message from "./components/Message";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/inbox" element={<Inbox />} />

        <Route path="/generate-link" element={<GenerateLink />}/>

        <Route path="/message/:userId" element={<Message />} />
      </Routes>
    </Router>
  );
}

export default App;