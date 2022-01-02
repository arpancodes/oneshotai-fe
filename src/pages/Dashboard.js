import React from "react";
import Plot from "../components/Plot";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="md:w-4/5 w-full m-auto">
      <h1 className="text-5xl my-7 text-center text-gray-800 font-bold p-4">
        Compare colleges
      </h1>
      <div className="flex flex-wrap">
        <div className="md:w-1/2 w-full">
          <Plot resource={"states"} />
        </div>
        <div className="md:w-1/2 w-full">
          <Plot resource={"courses"} />
        </div>
      </div>
      <Link
        className="p-2 bg-blue-700 text-white w-60 mx-auto block rounded-md  text-center"
        to="/colleges"
      >
        See All Colleges
      </Link>
    </div>
  );
};

export default Dashboard;
