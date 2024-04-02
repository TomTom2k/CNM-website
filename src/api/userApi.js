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

	updateAvatar: (file) => {
		const url = '/user/update-profile-pic';
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		let formData = new FormData();
		formData.append('profilePic', file)
		return axiosClient.patch(url, formData, config);
	},
	updateInfo: (data) => {
		const url = '/user/update-info';
		return axiosClient.put(url, data);
	},
};

export default userApi;
