import React from 'react'
import Plot from "../components/Plot"

const Dashboard = () => {
	return (
		<div className="flex">
    <div className="h-1/2 border">
      <Plot resource={"states"} />
    </div>
    <div className="h-1/2">
      <Plot resource={"courses"} />
    </div>
    </div>
	)
}

export default Dashboard
