import axiosClient from './axiosClient';

const conversationApi = {
	getConversations: () => {
		const url = '/conversation/';
		return axiosClient.get(url);
	},
};

export default conversationApi;
