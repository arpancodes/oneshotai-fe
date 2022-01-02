import React from "react";
import Plot from "../components/Plot";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="md:w-4/5 w-full m-auto">
      <h1 className="text-5xl mb-3 bg-purple-600 text-white p-4">
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
      <Link className="underline p-2 block text-center" to="/colleges">
        See All Colleges
      </Link>
    </div>
  );
};

export default Dashboard;
