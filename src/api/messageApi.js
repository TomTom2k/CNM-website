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
		const url = `/message/${conversationId}`;
		return axiosClient.get(url);
	},
	recallMessage: (messageId) => {
		const url = `/message/recall-message/${messageId}`;
		return axiosClient.patch(url);
	},
	deleteMessageForMeOnly: (messageId) => {
		const url = `/message/delete-message-for-me-only/${messageId}`;
		return axiosClient.patch(url);
	},
};

export default messageApi;
