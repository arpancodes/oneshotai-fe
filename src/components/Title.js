import React from "react";
import { Link } from "react-router-dom";

const Title = ({ link, to, title }) => {
  return (
    <>
      {link && (
        <Link className="underline p-2 block" to={to}>
          {link}
        </Link>
      )}
      <h1 className="text-5xl mb-3 font-bold text-gray-800 py-4">{title}</h1>
    </>
  );
};

export default Title;
