import React from "react";
import AuthNavBar from "./AuthNavBar";
import UpdateJob from "./UpdateJob";
import { useNavigate } from "react-router-dom";

export default function JobUpdates(props) {
  const navigate = useNavigate();
  const state = props.authState;
  // console.log(props);

  React.useEffect(function () {
    if (state !== "Log Out") navigate("/");
  });

  let jobsList = null;
  let tempJobsList = null;
  if (props.jobs) {
    tempJobsList = props.jobs.filter((job) => job.creator === props.user);

    jobsList = tempJobsList.map((job) => {
      // if (job.creator === props.user) {
      return <UpdateJob key={job.id} job={job} deleteJobs={props.deleteJobs} />;
      // } else return <div key={job.id}></div>;
    });
  }
  console.log(jobsList.length, props.jobs.length);

  return (
    <div>
      <AuthNavBar
        authState={props.authState}
        authMethod={props.authMethod}
        createPage={true}
        notHome={true}
      />
      <br />
      {jobsList && <div>{jobsList}</div>}
      {jobsList.length !== props.jobs.length && (
        <div>
          <br />
          <div className="card">
            <div className="container">
              <p>Nothing to Update</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
