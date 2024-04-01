import axiosClient from './axiosClient';

const userApi = {
	findUser: (phoneNumber) => {
		const url = '/user/find-user';
		return axiosClient.get(url, { params: { phoneNumber } });
	},
	changePassword: async (newPassword, phoneNumber) => {
		const url = '/user/change-password';
	
		const data = {
			newPassword: newPassword,
			phoneNumber: phoneNumber
		};
		return axiosClient.put(url, data);
	},

};

export default userApi;
