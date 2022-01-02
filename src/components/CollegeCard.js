import React from "react";
import { Link } from "react-router-dom";

const CollegeCard = ({ college }) => {
  return (
    <Link
      className="border p-6 md:w-1/4 w-full hover:cursor-pointer hover:bg-gray-100"
      to={`/colleges/${college._id}`}
      key={college._id}
    >
      <p className="text-xl font-bold">{college.name}</p>
      <p className="my-2">
        {college.city.name}, {college.state.name}, {college.country.name}
      </p>
      <p className="my-2">{college.numberOfStudents} Students</p>
      <p className="flex flex-wrap">
        {college.courses.map((course) => (
          <span className="text-sm bg-gray-200 my-1 mr-2 px-3 py-1 rounded-full">
            {course}
          </span>
        ))}
      </p>
    </Link>
  );
};

export default CollegeCard;
