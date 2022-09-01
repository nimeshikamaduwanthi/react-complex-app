import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";

import Header from "../src/components/Header";
import HomeGuest from "./pages/HomeGuest";
import Footer from "../src/components/Footer";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Home from "./pages/Home";
import CreatePost from "./components/CreatePost";
import ViewSingalePost from "./components/ViewSingalePost";
import FlashMessages from "./components/FlashMessages";
import ExampleContext from "./context/ExampleContext";

Axios.defaults.baseURL = "http://localhost:8080";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("complexappToken"))
  );

  const [flashMessages, setFlashMessages] = useState([]);

  const addFlashMessage = (msg) => {
    setFlashMessages((prev) => prev.concat(msg));
  };
  return (
    <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
          <Route path="/post/:id" element={<ViewSingalePost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ExampleContext.Provider>
  );
};

export default App;
