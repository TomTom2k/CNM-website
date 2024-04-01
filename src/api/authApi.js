import axiosClient from './axiosClient';

const authApi = {
	signInWithPhone: (data) => {
		const url = '/auth/sign-in-with-phone';
		return axiosClient.post(url, data);
	},
	signUpWithPhone: (data) => {
		const url = '/auth/sign-up-with-phone';
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return axiosClient.post(url, data, config);
	},
	secret: () => {
		const url = '/auth/secret';
		return axiosClient.get(url);
	},
};

export default authApi;
