import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcons from "../Icon/LoadingDotsIcons";
import StateContext from "../../context/StateContext";
import Axios from "axios";

const ProfileFollowers = () => {
  const appState = useContext(StateContext);
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get(`/profile/${username}/followers`);
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("there was a problem");
      }
    };
    fetchPosts();
  }, [username]);
  if (isLoading) return <LoadingDotsIcons />;
  return (
    <>
      <div className="list-group">
        {posts.map((follower, index) => {
          return (
            <Link
              key={index}
              to={`/profile/${follower.username}`}
              className="list-group-item list-group-item-action"
            >
              <img className="avatar-tiny" src={follower.avatar} alt="avatar" />{" "}
              {follower.username}
            </Link>
          );
        })}
        {posts.length === 0 && appState.user.username === username && (
          <p className="lead text-muted text-center">
            You don&rsquo;t have any followers yet.
          </p>
        )}
        {posts.length === 0 && appState.user.username !== username && (
          <p className="lead text-muted text-center">
            {username} doesn&rsquo;t have any followers yet.
            {appState.loggedIn && " Be the first to follow them!"}
            {!appState.loggedIn && (
              <>
                {" "}
                If you want to follow them you need to{" "}
                <Link to="/">sign up</Link> for an account first.{" "}
              </>
            )}
          </p>
        )}
      </div>
    </>
  );
};

export default ProfileFollowers;
