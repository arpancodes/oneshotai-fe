import React from "react";

const Bubble = ({ bubbleArray, selected = "" }) => {
  const displayArray = bubbleArray.filter(
    (x, idx) => idx <= 1 || selected === x
  );
  return (
    <>
      {displayArray.map((bubble) => (
        <span
          key={bubble}
          className={`bg-gray-200 rounded-full text-xs block p-1 px-2 m-1 ${
            selected === bubble ? "bg-blue-500 text-white" : ""
          }`}
        >
          {bubble}
        </span>
      ))}
      {bubbleArray.length > displayArray.length && (
        <span> and {bubbleArray.length - displayArray.length} more</span>
      )}
    </>
  );
};

export default Bubble;
