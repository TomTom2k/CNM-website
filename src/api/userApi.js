import axiosClient from './axiosClient';

const userApi = {
	findUser: (phoneNumber) => {
		const url = '/user/find-user';
		return axiosClient.get(url, { params: { phoneNumber } });
	},
	updateInfo: ({ file }) => {
		const url = '/user/profile-pic';
		const formData = new FormData();
	},
};

export default userApi;
