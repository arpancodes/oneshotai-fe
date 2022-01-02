import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../config/constants";

const Colleges = () => {
  const { id, studentId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState({});

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    let url = `${API}/colleges/${id}/students/${studentId}`;
    fetch(url, opts)
      .then((response) => response.json())
      .then((res) => {
        setStudent(res.data);
        setIsLoading(false);
      });

    return () => abortCtrl.abort();
  }, [id, studentId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="md:w-4/5 w-full m-auto">
        <Link
          className="underline p-2 block"
          to={`/colleges/${student.college._id}`}
        >
          &lt; See all Students of {student.college.name}
        </Link>
        <h1 className="text-5xl mb-3 bg-purple-600 text-white p-4">
          {student.name}
        </h1>
        <p>
          <span>Student of: </span> {student.college.name}
        </p>
        <p>
          <span>Joined in: </span> {student.year}
        </p>
        <p>
          <span>Skills: </span> {student.skills.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Colleges;
