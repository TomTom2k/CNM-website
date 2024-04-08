import axiosClient from './axiosClient';

const conversationApi = {
	getConversations: () => {
		const url = '/conversation/';
		return axiosClient.get(url);
	},
	createConversation: (data) => {
		const url = '/conversation/';
		return axiosClient.post(url, data);
	},
	getLastMessage: (conversationId) => {
		const url = `/conversation/${conversationId}`;
		return axiosClient.get(url);
	},
	getRecentlyConversations: (quantity) => {
		const url = `/conversation/recently/${quantity}`;
		return axiosClient.get(url);
	},
};

export default conversationApi;
