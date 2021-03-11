import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../util/hooks";

function PostForm(props) {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(cache, { data: { createPost } }) {
      values.body = "";
      cache.modify({
        fields: {
          getPosts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: createPost,
              fragment: gql`
                fragment NewPost on Posts {
                  id
                  body
                  createdAt
                  username
                  likes {
                    id
                    username
                    createdAt
                  }
                  comments {
                    id
                    body
                    username
                    createdAt
                  }
                }
              `,
            });
            return [newPostRef, ...existingPosts];
          },
        },
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="body"
          id="body"
          onChange={onChange}
          value={values.body}
        />
        <button type="submit">Post</button>
      </form>
      {error && <section>{error.graphQLErrors[0].message}</section>}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;
export default PostForm;
