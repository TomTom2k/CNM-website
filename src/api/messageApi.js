import axiosClient from './axiosClient';

const messageApi = {
	sendMessage: (data) => {
		//data : {
		//     receiverId: String || null
		//     content: String
		//     conversationId: String || null
		// }
		const url = '/message';
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return axiosClient.post(url, data, config);
	},
	getMessages: (conversationId) => {
		// data = {
		//     conversationId: String
		// }
		const url = `/message/${conversationId}`;
		return axiosClient.get(url);
	},
};

export default messageApi;
