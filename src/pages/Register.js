import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../util/hooks";
//import { AuthContext } from "../context/Auth";

function Register(props) {
  //const context = useContext(AuthContext);
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { onChange, onSubmit, values } = useForm(registerUser, initialState);
  const [errors, setErrors] = useState([]);
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      // context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function registerUser() {
    addUser();
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={onChange}
          value={values.email}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={onChange}
          value={values.password}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={onChange}
          value={values.confirmPassword}
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Register;
