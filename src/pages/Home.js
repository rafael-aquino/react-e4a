import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { AuthContext } from "../context/Auth";
import PostForm from "../components/PostForm";
import { Link } from "react-router-dom";
function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  const likePost = () => {
    console.log("liked");
  };
  const deletePost = () => {
    console.log("deletePost");
  };
  if (loading) {
    return <div>Loading...</div>;
  } else {
    const posts = data.getPosts;
    return (
      <div>
        {user && (
          <>
            <PostForm />
          </>
        )}
        <ul>
          {posts &&
            posts.map((p) => (
              <li
                key={p.id}
                style={{ border: "solid 1px red", padding: "2em 1em" }}
              >
                <p>{p.id}</p>
                <p>{p.username}</p>
                <p>{p.body}</p>
                <p>{p.createdAt}</p>
                <p>likes: {p.likes.length}</p>
                <button onClick={likePost}>Like</button>
                <p>
                  <Link to={`/post/${p.id}`}>post</Link>
                </p>
                {user && user.username === p.username && (
                  <button onClick={deletePost}>delete</button>
                )}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default Home;
