import React from "react";
import { useNavigate } from "react-router-dom";

const CollegeCard = ({ college }) => {
  const navigate = useNavigate();
  return (
    <div
      className="border p-2 md:w-1/4 w-full m-2 hover:cursor-pointer hover:bg-gray-100"
      onClick={() => navigate(`/colleges/${college._id}`)}
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
    </div>
  );
};

export default CollegeCard;
