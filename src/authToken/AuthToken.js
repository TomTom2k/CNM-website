import React, { createContext, useEffect, useReducer, useState } from 'react';
import Cookies from 'js-cookie';

import authApi from '../api/authApi';

export let AuthToken = createContext();

const AuthProvide = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = async (data) => {
		try {
			const res = await authApi.signInWithPhone(data);
			if (res?.headers.authorization) {
				Cookies.set('authorization', res.headers.authorization);
			}
			return res;
		} catch (error) {
			throw error;
		}
	};

	let secret = async () => {
		const res = await authApi.secret();
		if (res.user) {
			setUser(res.user);
		}
	};

	let authData = {
		user,
		login,
		secret,
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await authApi.secret();
				setUser(res?.user);
				console.log(res);
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};

		fetchUser();
	}, []);

	return <AuthToken.Provider value={authData}>{children}</AuthToken.Provider>;
};

export default AuthProvide;
