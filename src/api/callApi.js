import axiosClient from './axiosClient';

const callApi = {
	makeACallOne: (data) => {
		const url = '/call/make-a-call-one';
		return axiosClient.post(url, data);
	},
	makeACallGroup: (data) => {
		const url = '/call/make-a-call-group';
		return axiosClient.post(url, data);
	},
};

export default callApi;
