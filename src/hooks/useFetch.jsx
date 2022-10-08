import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function useFetch(endPoint, method, body, token) {
	const host = import.meta.env.VITE_API_HOST;

	const [isLoading, setIsLoading] = useState(false);

	const [response, setResponse] = useState({});

	const post = async () => {
		setIsLoading((prev) => (prev = true));
		try {
			const postData = await axios.post(
				`${host}${endPoint}`,
				JSON.stringify(body)
			);

			setIsLoading((prev) => (prev = false));
			setResponse({
				data: postData.data,
				status: postData.data.status,
				statusText: postData.statusText,
				message: postData.data.message,
			});
		} catch (error) {
			console.log(error);
		}
	};

	if (method === 'POST') {
		return { postData: post, response: response, isLoading: isLoading };
	}
}
