import "./App.css";

import DisplayNav from "./Components/DisplayNav";
import Main from "./Components/Main";
import ApplyJob from "./Components/ApplyJob";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateJob from "./Components/CreateJob";
import JobUpdates from "./Components/JobUpdates";
// import { useNavigate } from "react-router-dom";

export default function App() {
  // const [user, updateUser] = React.useState(
  //   JSON.parse(localStorage.getItem("users")) ?? null
  // );

  const [user, updateUser] = React.useState("");

  const [authState, authMethod] = React.useState("Sign Up");
  function changeAuthMethod(status) {
    if (status.loggedIn) {
      updateUser(status.username);
      authMethod("Log Out");
    } else {
      authMethod(function (presentMethod) {
        // console.log(presentMethod);
        if (presentMethod === "Sign Up") return "Log In";
        else if (presentMethod === "Log In") return "Sign Up";
        else {
          return "Sign Up";
        }
      });
    }
  }

  const [jobs, modifyJobs] = React.useState(
    JSON.parse(localStorage.getItem("jobs")) ?? null
  );

  function updateJobs(job) {
    // console.log(job);
    let newJobs = null;
    if (jobs) {
      newJobs = [...jobs, job];
    } else {
      newJobs = [job];
    }

    modifyJobs(newJobs);
  }

  function deleteJobs(event, id) {
    event.stopPropagation();
    modifyJobs((oldValue) => oldValue.filter((job) => job.id !== id));
  }

  React.useEffect(() => {
    // console.log(jobs);
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DisplayNav authState={authState} authMethod={changeAuthMethod} />
            }
          />
          <Route
            path="/display"
            element={
              <Main
                // user={user}
                authState={authState}
                authMethod={changeAuthMethod}
              />
            }
          />
          <Route
            path="/apply"
            element={
              <ApplyJob
                // user={user}
                authState={authState}
                authMethod={changeAuthMethod}
                jobs={jobs}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreateJob
                user={user}
                authState={authState}
                authMethod={changeAuthMethod}
                jobs={jobs}
                updateJobs={updateJobs}
              />
            }
          />
          <Route
            path="/updates"
            element={
              <JobUpdates
                user={user}
                authState={authState}
                authMethod={changeAuthMethod}
                jobs={jobs}
                deleteJobs={deleteJobs}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
