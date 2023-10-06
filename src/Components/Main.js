import React from "react";
import AuthNavBar from "./AuthNavBar";
import { useNavigate } from "react-router-dom";

export default function Main(props) {
  const navigate = useNavigate();
  const state = props.authState;
  // console.log(state);

  React.useEffect(function () {
    // console.log("rendered");
    if (state !== "Log Out") navigate("/");
  });

  function applyJob() {
    navigate("/apply");
  }

  function createJob() {
    navigate("/create");
  }

  return (
    <div>
      <AuthNavBar authState={props.authState} authMethod={props.authMethod} />
      <div>
        <div className="split left" onClick={applyJob}>
          <div className="centered">
            <h1>Apply For Job</h1>
            <p>Never too late to apply!!</p>
          </div>
        </div>
        <div className="split right" onClick={createJob}>
          <div className="centered">
            <h2>Create Requirement</h2>
            <p>Create an oppurtunity for others!!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
