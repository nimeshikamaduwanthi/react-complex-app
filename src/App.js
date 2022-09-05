import "./App.css";
import { useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import Axios from "axios";

import Header from "./components/Header/Header";
import HomeGuest from "./pages/HomeGuest";
import Footer from "./components/Footer/Footer";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Home from "./pages/Home";
import CreatePost from "./components/Post/CreatePost";
import ViewSingalePost from "./components/Post/ViewSingalePost";
import FlashMessages from "./components/Messages/FlashMessages";
import DispatchContext from "./context/DispatchContext";
import StateContext from "./context/StateContext";
import Profile from "./components/Profile/Profile";
import EditPost from "./components/Post/EditPost";
import NotFound from "./components/NotFound/NotFound";

Axios.defaults.baseURL = "http://localhost:8080";

const App = () => {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("complexappToken"),
      username: localStorage.getItem("complexappUsername"),
      avatar: localStorage.getItem("complexappAvatar"),
    },
  };

  const ourReducer = (draft, action) => {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
    }
  };

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("complexappToken", state.user.token);
      localStorage.setItem("complexappUsername", state.user.username);
      localStorage.setItem("complexappAvatar", state.user.avatar);
    } else {
      localStorage.removeItem("complexappToken");
      localStorage.removeItem("complexappUsername");
      localStorage.removeItem("complexappAvatar");
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route path="/profile/:username/*" element={<Profile />} />
            <Route
              path="/"
              element={state.loggedIn ? <Home /> : <HomeGuest />}
            />
            <Route path="/post/:id" element={<ViewSingalePost />} />
            <Route path="/post/:id/edit" element={<EditPost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default App;
