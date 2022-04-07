import { notification } from 'antd';

// A mock function to mimic making an async request for data
export async function fetchTodos() {
	try {
		const data = await fetch(
			'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		).then((response) => response.json());
		return data;
	} catch (error) {
		notification.error({ message: ' Something Went Wront' });
	}
	return [];
}
