import React from "react";
import AuthBody from "./AuthBody.js";
import AuthNavBar from "./AuthNavBar.js";

export default function DisplayPage(props) {
  // console.log(props);

  return (
    <div>
      <AuthNavBar authState={props.authState} authMethod={props.authMethod} />
      <AuthBody
        authState={props.authState}
        authMethod={function (state) {
          return props.authMethod(state);
        }}
      />
    </div>
  );
}
