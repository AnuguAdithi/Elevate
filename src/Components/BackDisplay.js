import React from "react";

export default function BackDisplay(props) {
  const job = props.job;
  return (
    <div className="backDisplay">
      {job.description !== "" && <h4>Description : {job.description} </h4>}
      {job.phone !== "" && (
        <>
          <h4>Contact Details </h4>
          <h4>Phone.No : {job.phone}</h4>
        </>
      )}

      <p className="note">Note: Contact the above sources for confirmation!!</p>
      <button onClick={props.displayData}>Back</button>
    </div>
  );
}
