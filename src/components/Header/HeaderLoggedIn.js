import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import DispatchContext from "../../context/DispatchContext";
import StateContext from "../../context/StateContext";

const HeaderLoggedIn = () => {
  const navigate = useNavigate();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const handleLogout = () => {
    appDispatch({ type: "logout" });
    navigate("/");
  };

  const handleSearchIcon = (e) => {
    e.preventDefault();
    appDispatch({ type: "openSearch" });
  };
  return (
    <div className="flex-row my-3 my-md-0">
      <a
        data-for="search"
        data-tip="Search"
        onClick={handleSearchIcon}
        href="#"
        className="text-white mr-2 header-search-icon"
        title="Search"
      >
        <i className="fas fa-search"></i>
      </a>{" "}
      <span className="mr-2 header-chat-icon text-white" title="Chat">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>{" "}
      <Link
        to={`/profile/${appState.user.username}`}
        className="mr-2"
        title="My Profile"
      >
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>{" "}
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>{" "}
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
};

export default HeaderLoggedIn;
