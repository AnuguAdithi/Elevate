import React from "react";
import AuthNavBar from "./AuthNavBar";
import { useNavigate } from "react-router-dom";
import FormatJob from "./FormatJob";

export default function ApplyJob(props) {
  const current = new Date();

  const navigate = useNavigate();
  const state = props.authState;
  let len = props.jobs?.length ?? 0;

  React.useEffect(function () {
    if (state !== "Log Out") navigate("/");
  });

  let jobsList = null;
  // console.log(current);
  if (props.jobs) {
    jobsList = props.jobs.map((job) => {
      const currDate = job.start.split("-");
      const dd = currDate[2];
      const mm = currDate[1];
      const yy = currDate[0];

      if (
        yy > current.getFullYear() ||
        (mm > current.getMonth() + 1 && yy >= current.getFullYear()) ||
        (dd >= current.getDate() &&
          mm > current.getMonth() &&
          yy >= current.getFullYear())
      )
        return <FormatJob key={job.id} job={job} currentDate={current} />;
      else return <div key={job.id}></div>;
    });
  }

  return (
    <div>
      <AuthNavBar
        authState={props.authState}
        authMethod={props.authMethod}
        notHome={true}
      />
      <h1 className="title">Job Portal</h1>

      {len === 0 && (
        <div className="card">
          <div className="container">
            <h1>
              <b>OOPS!!</b>
            </h1>
            <p>No Vacancies To Apply!</p>
          </div>
        </div>
      )}
      {len !== 0 && <div>{jobsList}</div>}
    </div>
  );
}
