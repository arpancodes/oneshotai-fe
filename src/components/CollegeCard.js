import React from "react";
import { Link } from "react-router-dom";

const CollegeCard = ({ college }) => {
  return (
    <Link
      className="border p-2 md:w-1/4 w-full m-2 hover:cursor-pointer hover:bg-gray-100"
      to={`/colleges/${college._id}`}
      key={college._id}
    >
      <p className="text-xl font-bold">{college.name}</p>
      <p>
        {college.city.name}, {college.state.name}, {college.country.name}
      </p>
      <p>{college.numberOfStudents} Students</p>
      <p className="flex flex-wrap">
        {college.courses.map((course) => (
          <span className="text-sm bg-gray-200 m-2 p-2">{course}</span>
        ))}
      </p>
    </Link>
  );
};

export default CollegeCard;
