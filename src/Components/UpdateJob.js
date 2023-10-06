import React from "react";

export default function UpdateJob(props) {
  // console.log(props.job);

  const [classValue, changeClass] = React.useState("collapsible");
  const [content, changeContent] = React.useState("content-none");

  function handleCollapsible() {
    changeClass((value) => {
      return value === "collapsible" ? "active" : "collapsible";
    });
    changeContent((value) => {
      return value === "content-none" ? "content-block" : "content-none";
    });
  }

  const job = props.job;
  const address =
    (job.street !== "" ? job.street : "") +
    (job.city !== "" ? `,${job.city}` : "") +
    (job.zip !== "" ? `,${job.zip}` : "") +
    (job.state !== "" ? `,${job.state}` : "") +
    (job.country !== "" ? `,${job.country}` : "");

  const duration = job.start + (job.end !== "" ? `to ${job.end}` : "");
  const contact =
    job.phone + (job.phone && job.phone1 !== "" ? `, ${job.phone1}` : "");

  return (
    <div>
      <button className={classValue} onClick={handleCollapsible}>
        {props.job.title}
      </button>
      <div className={content}>
        {job.description && <p>About: {job.description}</p>}
        {address && <p>Adress: {address}</p>}
        <p>Requirement on : {duration} </p>
        <p>Approximate working hours: {job.hours}</p>
        <p>Contact Details: {contact}</p>

        <button
          className="delete"
          onClick={(event) => props.deleteJobs(event, job.id)}
        >
          Delete
        </button>
        {/* <button>Edit</button> */}
      </div>
    </div>
  );
}
