import React from "react";
import FrontDisplay from "./FrontDisplay";
import BackDisplay from "./BackDisplay";
// import { getCurrentDate } from "util";

export default function FormatJob(props) {
  // console.log(props);
  // console.log(getCurrentDate());
  const job = props.job;
  const [apply, modifyApply] = React.useState(false);
  // let Date = new Date();

  function displayData(event) {
    event.preventDefault();
    // console.log("Button clicked!!");
    modifyApply(() => {
      return !apply;
    });
  }

  return (
    <>
      <div className={!apply ? "jobCard" : "backJobCard"}>
        <h2>{job.title}</h2>
        <div>
          {!apply && <FrontDisplay job={job} displayData={displayData} />}
          {apply && <BackDisplay job={job} displayData={displayData} />}
        </div>
      </div>
    </>
  );
}
