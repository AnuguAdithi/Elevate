import React from "react";
import { Link } from "react-router-dom";

export default function AuthNavBar(props) {
  // console.log(props);
  return (
    <nav>
      <div className="text">
        <h1>Elevate</h1>
      </div>
      <div className="title">
        {props.notHome && (
          <Link to="/display" className="link">
            Home
          </Link>
        )}

        {props.Notif && (
          <Link to="/updates" className="link">
            Updates
          </Link>
        )}

        {props.createPage && (
          <Link to="/create" className="link">
            Create Job
          </Link>
        )}
      </div>

      <button
        onClick={function () {
          return props.authMethod(props.authState);
        }}
      >
        {props.authState}
      </button>
    </nav>
  );
}
