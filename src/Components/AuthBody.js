import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuthBody(props) {
  // console.log(props);
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);

  const [authData, modifyAuthData] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [users, modifyUsers] = React.useState(
    JSON.parse(localStorage.getItem("users")) ?? []
  );

  const state =
    props.authState === "Sign Up"
      ? "Log In"
      : props.authState !== "Log Out"
      ? "Sign Up"
      : "";

  //updating users list in local storage by adding the newUser to the exitsing list in updateUsers
  function updateUsers(user) {
    let newUser = null;
    if (user) {
      newUser = [...users, user];
      localStorage.setItem("users", JSON.stringify(newUser));
    } else {
      newUser = [users];
    }
    modifyUsers(newUser);
  }

  //handling change event for authenciation fields(username,password,confirm password)
  function handleAuthChange(event) {
    const { name, value } = event.target;
    modifyAuthData(function (prevAuthVal) {
      // console.log(name, value);
      return {
        ...prevAuthVal,
        [name]: value,
      };
    });
  }

  //checking logic for login and signUp
  function submitAuthData(event) {
    event.preventDefault();
    const prevUser = users.filter(
      (user) =>
        user.password === authData.password &&
        user.username === authData.username
    );

    if (state === "Log In") {
      if (authData.username && authData.password && prevUser.length !== 0) {
        console.log("logged In");

        const success = {
          username: authData.username,
          password: authData.password,
          loggedIn: true,
        };
        props.authMethod(success);
        navigate("/display");
      } else {
        setError(true);
        props.authMethod(props.authState);
      }
    } else {
      if (
        authData.username &&
        authData.password &&
        authData.confirmPassword &&
        authData.confirmPassword === authData.password
      ) {
        console.log("Signed Up");
        const success = {
          username: authData.username,
          password: authData.password,
          loggedIn: "sucess",
        };

        updateUsers(authData);
        props.authMethod(success);

        navigate("/display");
      } else {
        setError(true);
      }
    }
  }

  return (
    <div>
      <div className="authBody">
        {state && (
          <form>
            {error && <div className="error">Inalid {state} Details</div>}
            <h3>{state} here!!</h3>
            <input
              className="authInput"
              type="text"
              placeholder="username"
              name="username"
              value={authData.username}
              onChange={handleAuthChange}
            />
            <input
              className="authInput"
              type="password"
              placeholder="Password"
              name="password"
              value={authData.password}
              onChange={handleAuthChange}
            />
            {state === "Sign Up" ? (
              <input
                className="authInput"
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={authData.confirmPassword}
                onChange={handleAuthChange}
              />
            ) : (
              <br />
            )}

            <button onClick={submitAuthData}>{state}</button>
          </form>
        )}
      </div>
    </div>
  );
}
