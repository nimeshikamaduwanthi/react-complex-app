import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Page from "../../pages/Page";
import LoadingDotsIcons from "../Icon/LoadingDotsIcons";
import Axios from "axios";

const ViewSingalePost = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get(`/post/${id}`);
        setPost(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("there was a problem");
      }
    };
    fetchPosts();
  }, []);

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcons />
      </Page>
    );

  const date = new Date(post.createdDate);
  const dataFormatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{" "}
        on {dataFormatted}
      </p>

      <div className="body-content">{post.body}</div>
    </Page>
  );
};
export default ViewSingalePost;
