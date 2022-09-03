import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcons from "../Icon/LoadingDotsIcons";
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
  }, []);
  if (isLoading) return <LoadingDotsIcons />;
  return (
    <>
      <div className="list-group">
        {posts.map((post) => {
          const date = new Date(post.createdDate);
          const dataFormatted = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
          return (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="list-group-item list-group-item-action"
            >
              <img className="avatar-tiny" src={post.author.avatar} />{" "}
              <strong>{post.title}</strong>{" "}
              <span className="text-muted small">on {dataFormatted} </span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ProfilePosts;
