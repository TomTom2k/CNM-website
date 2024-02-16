import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { AuthToken } from '../authToken/AuthToken';

const PrivateRoute = ({ roles, redirect, children }) => {
	const { user } = useContext(AuthToken);
	console.log(user);
	const role = user?.Role;
	console.log(role);

	if (!role) {
		return <Navigate to={redirect} />;
	} else if (!roles.includes(role)) {
		console.log('navigate');
		return <Navigate to="/403" />;
	}
	return <>{children}</>;
};

export default PrivateRoute;
