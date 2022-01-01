import React, {useState, useEffect} from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import {API} from '../config/constants';

const Colleges = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const [filters, setFilters] = useState({states: null, courses: null});
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [colleges, setColleges] = useState([]);
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setFilters({
			states: searchParams.get("states"),
			courses: searchParams.get("courses")
		});
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
				setIsLoading(false)
			});

			return () => abortCtrl.abort();
	}, [filters, page]);



	if (isLoading) {
		return <div>Loading...</div>
	}
	return (
		<div>
			<div className="flex">
				<div className="h-1/2 border">
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>State</th>
								<th>Courses</th>
							</tr>
						</thead>
						<tbody>
							{colleges.map((college) => (
								<tr onClick={() => navigate(`/colleges/${college._id}`)} key={college.id}>
									<td>{college.name}</td>
									<td>{college.state.name}</td>
									<td>{college.courses.join(", ")}</td>
								</tr>
							))}
						</tbody>
					</table>
					<button  className="p-2 bg-blue-200 disabled:bg-gray-200" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
					<button className="disabled:bg-gray-200 p-2 bg-blue-200"  disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
					</div>
				</div>
		</div>
	)
}

export default Colleges
