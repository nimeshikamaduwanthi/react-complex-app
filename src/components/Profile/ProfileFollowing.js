import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcons from "../Icon/LoadingDotsIcons";
import Axios from "axios";
import StateContext from "../../context/StateContext";

const ProfileFollowing = () => {
  const appState = useContext(StateContext);
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get(`/profile/${username}/following`);
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
            You aren&rsquo;t following anyone yet.
          </p>
        )}
        {posts.length === 0 && appState.user.username !== username && (
          <p className="lead text-muted text-center">
            {username} isn&rsquo;t following anyone yet.
          </p>
        )}
      </div>
    </>
  );
};

export default ProfileFollowing;
