import { Link } from "react-router-dom";
import { useContext } from "react";
import DispatchContext from "../../context/DispatchContext";

const Post = ({ post }) => {
  const appDispatch = useContext(DispatchContext);
  const date = new Date(post.createdDate);
  const dataFormatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  console.log(post);
  return (
    <Link
      onClick={() => appDispatch({ type: "closeSearch" })}
      key={post._id}
      to={`/post/${post._id}`}
      className="list-group-item list-group-item-action"
    >
      <img className="avatar-tiny" src={post.author.avatar} alt="avatar" />{" "}
      <strong>{post.title}</strong>{" "}
      <span className="text-muted small">
        {post.author && <>by {post.author.username}</>} on {dataFormatted}{" "}
      </span>
    </Link>
  );
};

export default Post;
