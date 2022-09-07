import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcons from "../Icon/LoadingDotsIcons";
import Post from "../Post/Post";
import Axios from "axios";

const ProfilePosts = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get(`/profile/${username}/posts`);
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
        {posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
      </div>
    </>
  );
};

export default ProfilePosts;
