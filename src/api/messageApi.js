import axiosClient from './axiosClient';

const messageApi = {
	sendMessage: (data) => {
		//data : {
		//     receiverId: String || null
		//     content: String
		//     conversationId: String || null
		// }
		const url = '/message';
		return axiosClient.post(url, data);
	},
	getMessages: (conversationId) => {
		// data = {
		//     conversationId: String
		// }
		const url = `/message/${conversationId}`;
		return axiosClient.get(url);
	},
	deleteMessage: (messageId) => {
		const url = `/message/delete/${messageId}`; // Construct the URL for deletion
		return axiosClient.put(url); // Perform a DELETE request
	},
	revokeMessage: (messageId) => {
		const url = `/message/revoke/${messageId}`; // Construct the URL for revocation
		return axiosClient.put(url); // Perform a PUT request
	},
};

export default messageApi;
