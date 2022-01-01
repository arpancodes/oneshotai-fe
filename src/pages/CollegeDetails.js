import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import {API} from '../config/constants';

const Colleges = () => {
	const {id} = useParams()
	const navigate = useNavigate();
	const [college, setCollege] = useState({})
	const [students, setStudents] = useState({})
	const [similarColleges, setSimilarColleges] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	useEffect(() => {
			const urls = [`${API}/colleges/${id}`, `${API}/colleges/${id}/students?page=${page}`, `${API}/colleges/${id}/similar`]
			Promise.all(urls.map(url =>
				fetch(url).then(resp => resp.json())
		)).then(([college, students, similarColleges]) => {
				setCollege(college.data)
				setStudents(students.data)
				setSimilarColleges(similarColleges.data)
				setIsLoading(false)
				setTotalPages(students.pages)
		})
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
		return <div>Loading...</div>
	}

	return (
		<div>
			<div className="">
				<p>{college.name}</p>
				<p>{college.city.name}, {college.state.name}, {college.country.name}</p>
				<div className="h-1/2 border">
				<h3>Students</h3>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Year</th>
								<th>Skills</th>
							</tr>
						</thead>
						<tbody>
							{students.map((student) => (
								<tr onClick={() => navigate(`/colleges/${id}/student/${student._id}`)} key={student._id}>
									<td>{student.name}</td>
									<td>{student.year}</td>
									<td>{student.skills.join(", ")}</td>
								</tr>
							))}
						</tbody>
					</table>
					<button  className="p-2 bg-blue-200 disabled:bg-gray-200" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
					<button className="disabled:bg-gray-200 p-2 bg-blue-200"  disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
					</div>
					<div>
						<h3>Similar Colleges</h3>
						{similarColleges.map((college) => (
							<div className="border p-2" key={college._id}>
								<p>{college.name}</p>
								<p>{college.city.name}, {college.state.name}, {college.country.name}</p>
							</div>
						))}
					</div>
			</div>
		</div>
	)
}

export default Colleges
