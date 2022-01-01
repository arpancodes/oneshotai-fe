import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import {API} from '../config/constants';

const Colleges = () => {
	const {id, studentId} = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const [student, setStudent] = useState({})

	useEffect(() => {
		const abortCtrl = new AbortController();
		const opts = { signal: abortCtrl.signal };
		let url = `${API}/colleges/${id}/students/${studentId}`;
		fetch(url, opts)
			.then((response) => response.json())
			.then((res) => {
				setStudent(res.data);
				setIsLoading(false)
			});

			return () => abortCtrl.abort();
	}, [id, studentId]);

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<div className="">
				<p>{student.name}</p>
			</div>
		</div>
	)
}

export default Colleges
