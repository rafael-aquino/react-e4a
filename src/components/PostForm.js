import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../util/hooks";

function PostForm(props) {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(_, result) {
      console.log(result);
    },
  });
  function createPostCallback() {
    createPost();
  }
  return (
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
