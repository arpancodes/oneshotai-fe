import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Bubble from "../components/Bubble";
import CollegeCard from "../components/CollegeCard";
import Loading from "../components/Loading";
import Title from "../components/Title";
import { API } from "../config/constants";

const Colleges = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState({});
  const [students, setStudents] = useState({});
  const [similarColleges, setSimilarColleges] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const urls = [
      `${API}/colleges/${id}`,
      `${API}/colleges/${id}/students?page=${page}`,
      `${API}/colleges/${id}/similar`,
    ];
    Promise.all(urls.map((url) => fetch(url).then((resp) => resp.json()))).then(
      ([college, students, similarColleges]) => {
        setCollege(college.data);
        setStudents(students.data);
        setSimilarColleges(similarColleges.data);
        setIsLoading(false);
        setTotalPages(students.pages);
      }
    );
  }, [id, page]);

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    let url = `${API}/colleges/${id}/students?page=${page}`;
    fetch(url, opts)
      .then((response) => response.json())
      .then((res) => {
        setStudents(res.data);
        setTotalPages(res.pages);
      });

    return () => abortCtrl.abort();
  }, [id, page]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="md:w-4/5 w-full m-auto">
      <Title link="See all Colleges" to="/colleges" title={college.name} />
      <div>
        <p>
          <span className="font-medium">Location: </span> {college.city.name},{" "}
          {college.state.name}, {college.country.name}
        </p>
        <p>
          <span className="font-medium">Founded in: </span> {college.year}
        </p>
        <p>
          <span className="font-medium">Number of students: </span>{" "}
          {college.numberOfStudents}
        </p>
        <p>
          <span className="font-medium">Courses offered: </span>{" "}
          {college.courses.join(", ")}
        </p>
        <div className="h-1/2">
          <h3 className="text-3xl py-4 my-4 font-semibold">Students</h3>
          <table className="table-fixed w-full shadow-xl">
            <thead>
              <tr className="bg-blue-700 sticky top-0">
                <th className="p-6 text-white">Name</th>
                <th className="p-6 text-white">Year</th>
                <th className="p-6 text-white">Skills</th>
              </tr>
            </thead>
            <tbody className="border">
              {students.length > 0 ? (
                students.map((student) => (
                  <tr
                    className="hover:cursor-pointer hover:bg-gray-100 border-b"
                    onClick={() =>
                      navigate(`/colleges/${id}/student/${student._id}`)
                    }
                    key={student._id}
                  >
                    <td className="p-4 break-words text-center">
                      {student.name}
                    </td>
                    <td className="p-4 text-center">{student.year}</td>
                    <td className="p-4 text-center flex flex-wrap items-center">
                      <Bubble bubbleArray={student.skills} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center" colSpan="3">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-10">
            <button
              className="p-2 bg-gray-500 rounded-md disabled:bg-gray-200 disabled:text-gray-400 text-white w-60 mx-2"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <button
              className="disabled:bg-gray-200 rounded-md disabled:text-gray-400 p-2 bg-blue-700 text-white w-60 mx-2"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
          <div className="text-center m-2 my-4 font-bold text-sm ">
            {page} / {totalPages} pages
          </div>
        </div>
        <div>
          <h3 className="text-3xl py-4 my-4 font-semibold">Similar Colleges</h3>
          <div className="flex flex-wrap justify-start">
            {similarColleges.map((college) => (
              <CollegeCard college={college} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleges;
