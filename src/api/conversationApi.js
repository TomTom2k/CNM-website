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
};

export default conversationApi;
