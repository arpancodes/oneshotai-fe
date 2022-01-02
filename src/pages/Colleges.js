import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { API } from "../config/constants";
import Select from "react-select";
import { COURSES, STATES } from "../config/constants";

const Colleges = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ states: "", courses: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [colleges, setColleges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFilters({
      states: searchParams.get("states") || "",
      courses: searchParams.get("courses") || "",
    });
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    let url = `${API}/colleges?page=${page}`;
    if (filters.states) {
      url += `&states=${filters.states}`;
    }
    if (filters.courses) {
      url += `&courses=${filters.courses}`;
    }

    fetch(url, opts)
      .then((response) => response.json())
      .then((res) => {
        setColleges(res.data);
        setTotalPages(res.pages);
        setIsLoading(false);
      });

    return () => abortCtrl.abort();
  }, [filters, page]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex justify-center">
        <div className="md:w-4/5 w-full ">
          <Link className="underline p-2 block" to="/">
            &lt; See Dashboard
          </Link>
          <h1 className="text-5xl mb-3 bg-purple-600 text-white p-4">
            Browse Colleges
          </h1>
          <div className="flex w-full my-2 flex-wrap md:flex-nowrap">
            <label className="flex items-center mx-2 md:w-1/2 w-full">
              Course:
              <Select
                className="mx-1 w-full"
                options={COURSES}
                defaultValue={{
                  label: filters.courses,
                  value: filters.courses,
                }}
                onChange={(e) =>
                  setSearchParams({ ...filters, courses: e.value })
                }
              />
            </label>
            <label className="flex items-center mx-2 md:w-1/2 w-full">
              State:
              <Select
                className="mx-1 w-full"
                options={STATES}
                defaultValue={{ label: filters.states, value: filters.states }}
                onChange={(e) =>
                  setSearchParams({ ...filters, states: e.value })
                }
              />
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="table-fixed w-full">
              <thead>
                <tr className="bg-gray-500 sticky top-0">
                  <th className="p-4 text-white">Name</th>
                  <th className="p-4 text-white">Location</th>
                  <th className="p-4 text-white">Courses</th>
                </tr>
              </thead>
              <tbody>
                {colleges.length > 0 ? (
                  colleges.map((college) => (
                    <tr
                      className="hover:cursor-pointer hover:bg-gray-100"
                      onClick={() => navigate(`/colleges/${college._id}`)}
                      key={college._id}
                    >
                      <td className="p-4 text-center">{college.name}</td>
                      <td className="p-4 text-center">
                        {college.city.name}, {college.state.name},{" "}
                        {college.country.name}
                      </td>
                      <td className="p-4 text-center flex flex-wrap items-center">
                        {college.courses
                          .filter(
                            (course, idx) =>
                              idx <= 1 || searchParams.get("courses") === course
                          )
                          .map((course) => (
                            <span
                              className={`bg-gray-200 rounded-full block p-1 px-2 m-2 ${
                                searchParams.get("courses") === course
                                  ? "bg-green-300"
                                  : ""
                              }`}
                            >
                              {course}
                            </span>
                          ))}{" "}
                        {college.courses.length > 2 && (
                          <span> and {college.courses.length - 2} more</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center">
                      No colleges found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="p-2 bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 text-white w-60 mx-2"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <button
              className="disabled:bg-gray-200 disabled:text-gray-400 p-2 bg-blue-500 text-white w-60 mx-2"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
          <div className="text-center m-2 font-bold text-sm ">
            {page} / {totalPages} pages
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleges;
