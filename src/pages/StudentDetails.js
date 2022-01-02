import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Title from "../components/Title";
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
    return <Loading />;
  }

  return (
    <div>
      <div className="md:w-4/5 w-full m-auto">
        <Title
          link={`See all Students of ${student.college.name}`}
          title={student.name}
          to={`/colleges/${student.college._id}`}
        />
        <p>
          <span className="font-medium">Student of: </span>{" "}
          {student.college.name}
        </p>
        <p>
          <span className="font-medium">Joined in: </span> {student.year}
        </p>
        <p>
          <span className="font-medium">Skills: </span>{" "}
          {student.skills.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Colleges;
