import React from "react";
import AuthNavBar from "./AuthNavBar";
import { useNavigate } from "react-router-dom";
// import Parse from "parse/dist/parse.min.js";

export default function CreateJob(props) {
  // console.log(props);

  const [error, changeErrState] = React.useState(false);

  const [job, modifyJob] = React.useState({
    creator: "",
    applied: [],
    filled: false,
    id: "",
    title: "",
    description: "",
    start: "",
    end: "",
    hours: "",
    amount: "",
    address: "",
    phone: "",
    phone1: "",
    available: true,
  });

  function handleJobChange(event) {
    const { name, value } = event.target;
    // console.log(name, value);
    modifyJob(function (prevAuthVal) {
      // console.log(name,value)
      return {
        ...prevAuthVal,
        [name]: value,
      };
    });
  }

  const navigate = useNavigate();
  const state = props.authState;
  React.useEffect(function () {
    if (state !== "Log Out") navigate("/");
  });

  function createJob(event) {
    event.preventDefault();
    // console.log(job);
    if (
      job.title === "" ||
      job.start === "" ||
      job.hours === "" ||
      job.phone === ""
    ) {
      changeErrState(true);
      navigate("/create");
    } else {
      changeErrState(false);
      const len = props.jobs?.length ?? -1;
      const val = props.jobs[len - 1].id + 1;
      job.id = len === -1 ? 1 : val;
      job.creator = props.user;
      props.updateJobs(job);
      console.log(job);
      navigate("/display");
    }
    // console.log(error);
  }

  return (
    <div>
      <AuthNavBar
        Notif={true}
        authState={props.authState}
        authMethod={props.authMethod}
        notHome={true}
      />
      <br />
      <form className="form-group">
        {error && <h3 className="error"> Need to enter required field</h3>}
        <h2>Fill the Details for Job Requirement</h2>
        <label className="createJobEle">
          Title *
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleJobChange}
          />
        </label>
        <label className="createJobEle">
          Title Description
          <textarea
            rows="3"
            cols="100"
            type="text"
            id="desc"
            name="description"
            value={job.description}
            onChange={handleJobChange}
          ></textarea>
        </label>
        <div className="inline">
          <label className="createJobEle">
            Start Date and Time Of Work *
            <input
              type="date"
              name="start"
              value={job.start}
              onChange={handleJobChange}
            />
          </label>
          <label className="createJobEle">
            End Date and Time Of Work
            <input
              type="date"
              name="end"
              value={job.end}
              onChange={handleJobChange}
            />
          </label>
        </div>
        <div className="inline">
          <label className="createJobEle">
            Approx hours *
            <input
              type="number"
              name="hours"
              value={job.hours}
              onChange={handleJobChange}
            />
          </label>
          <label className="createJobEle">
            Amount in rupees.
            <input
              type="amount"
              name="amount"
              value={job.amount}
              onChange={handleJobChange}
            />
          </label>
        </div>

        <label className="createJobEle">
          Location oF Work(Address)
          <textarea
            rows="3"
            cols="100"
            type="text"
            id="address"
            name="address"
            value={job.address}
            onChange={handleJobChange}
          ></textarea>
        </label>
        <h2>Contact Details</h2>

        <div className="inline">
          <label className="createJobEle">
            Phone Number *
            <input
              type="text"
              onChange={handleJobChange}
              name="phone"
              value={job.phone}
              required
            />
          </label>
          <label className="createJobEle">
            Alternate Phone Number
            <input
              type="phone1"
              onChange={handleJobChange}
              name="phone1"
              value={job.phone1}
              required
            />
          </label>
        </div>
        <button className="create" onClick={createJob}>
          Create
        </button>
      </form>
    </div>
  );
}
