import React from "react";
import { useQuery, gql } from "@apollo/client";

function Home() {
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  const likePost = () => {
    console.log("liked");
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    const posts = data.getPosts;
    return (
      <div>
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
