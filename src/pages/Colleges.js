import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { API } from "../config/constants";
import Select from "react-select";
import { COURSES, STATES } from "../config/constants";
import Bubble from "../components/Bubble";
import Loading from "../components/Loading";
import Title from "../components/Title";

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
    return <Loading />;
  }
  return (
    <div>
      <div className="flex justify-center">
        <div className="md:w-4/5 w-full ">
          <Title link="&lt; See Dashboard" to="/" title="Browse Colleges" />
          <div className="flex w-full my-6 flex-wrap md:flex-nowrap">
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
          <div className="">
            <table className="table-fixed w-full shadow-xl">
              <thead>
                <tr className="bg-blue-700 sticky top-0">
                  <th className="p-6 text-white">Name</th>
                  <th className="p-6 text-white">Location</th>
                  <th className="p-6 text-white">Courses</th>
                </tr>
              </thead>
              <tbody className="border">
                {colleges.length > 0 ? (
                  colleges.map((college, idx) => (
                    <tr
                      className="hover:cursor-pointer hover:bg-gray-100 border-b bg-white"
                      onClick={() => navigate(`/colleges/${college._id}`)}
                      key={college._id}
                    >
                      <td
                        className={`p-4 text-center ${
                          idx === colleges.length - 1 ? " rounded-bl-lg" : ""
                        }`}
                      >
                        {college.name}
                      </td>
                      <td className="p-4 text-center">
                        {college.city.name}, {college.state.name},{" "}
                        {college.country.name}
                      </td>
                      <td
                        className={`p-4 text-center flex flex-wrap items-center ${
                          idx === colleges.length - 1 ? " rounded-br-lg" : ""
                        } `}
                      >
                        <Bubble
                          bubbleArray={college.courses}
                          selected={searchParams.get("courses")}
                        />
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
          <div className="text-center my-4 font-bold text-sm ">
            {page} / {totalPages} pages
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleges;
