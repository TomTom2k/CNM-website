import axiosClient from './axiosClient';

const userApi = {
	findUser: (phoneNumber) => {
		const url = '/user/find-user';
		return axiosClient.get(url, { params: { phoneNumber } });
	},
};

export default userApi;
