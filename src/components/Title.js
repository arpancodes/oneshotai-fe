import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const Title = ({ link, to, title }) => {
  return (
    <>
      {link && (
        <Link className="underline p-2 flex items-center" to={to}>
          <IoArrowBackSharp className="mr-2" />
          {link}
        </Link>
      )}
      <h1 className="md:text-5xl text-3xl mb-3 font-bold text-gray-800 py-4">
        {title}
      </h1>
    </>
  );
};

export default Title;
