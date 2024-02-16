import axiosClient from './axiosClient';

const authApi = {
	signInWithPhone: (data) => {
		const url = '/user/sign-in-with-phone';
		return axiosClient.post(url, data);
	},
	signUpWithPhone: (data) => {
		const url = '/user/sign-up-with-phone';
		return axiosClient.post(url, data);
	},
	secret: () => {
		const url = '/user/secret';
		return axiosClient.get(url);
	},
};

export default authApi;
