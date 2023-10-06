import React from "react";

export default function FrontDisplay(props) {
  const job = props.job;
  console.log(job);
  const address = job.address !== "" ? `,${job.address}` : "";
  return (
    <div>
      {job.start !== "" && <h4>Start Date :{job.start} </h4>}
      {job.end !== "" && <h4>End Date :{job.end}</h4>}
      {job.hours !== "" && <h4>Number of hours :{job.hours}</h4>}
      {job.amount !== "" && <h4>Amount :{job.amount}</h4>}
      {job.address !== "" && <h4>Adress :{address}</h4>}
      <br />
      <button onClick={props.displayData}>Next</button>
    </div>
  );
}

// {job.street}{job.city!="" && ,{job.city}},{job.zip},{job.state},{job.country}
