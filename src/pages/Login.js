import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/Auth";

function Login(props) {
  const context = useContext(AuthContext);
  const initialState = {
    username: "",
    password: "",
  };
  const { onChange, onSubmit, values } = useForm(
    loginUserCallback,
    initialState
  );
  const [errors, setErrors] = useState([]);
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function loginUserCallback() {
    loginUser();
  }
  return (
    <div>
      <form noValidate onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={onChange}
          value={values.username}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={onChange}
          value={values.password}
        />
        <button type="submit">Register</button>
      </form>
      <div>
        {Object.keys(errors).length > 0 && (
          <ul>
            {Object.values(errors).map((e) => (
              <li key={e}> {e}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Login;
