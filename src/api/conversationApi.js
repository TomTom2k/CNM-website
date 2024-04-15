import axiosClient from './axiosClient';

const conversationApi = {
	getConversations: () => {
		const url = '/conversation/';
		return axiosClient.get(url);
	},
	createConversation: (data) => {
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		let formData = new FormData();
		formData.append('groupAvatar', data.avatar)
		formData.append('name', data.name)
		for(const participantId of data.participantIds){
			formData.append('participantIds', participantId)
		}
		const url = '/conversation/';
		return axiosClient.post(url, formData, config);
	},
	getLastMessage: (conversationId) => {
		const url = `/conversation/${conversationId}`;
		return axiosClient.get(url);
	},
	getRecentlyConversations: (quantity) => {
		const url = `/conversation/recently/${quantity}`;
		return axiosClient.get(url);
	},
	getRecentlyFriendConversations: (quantity) => {
		const url = `/conversation/recently-with-friend/${quantity}`;
		return axiosClient.get(url);
	},
	deleteConversation: (conversationId) => {
		const url = `/conversation/${conversationId}`;
		return axiosClient.delete(url);
	},
};

export default conversationApi;
