import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthToken } from '../authToken/AuthToken';
import configs from '../configs';

const PrivateRoute = ({ children }) => {
	const { user } = useContext(AuthToken);
	const { isFetchingUser } = useContext(AuthToken);
	if (isFetchingUser) {
		return <div>Loading...</div>;
	}
	console.log(user);

	if (!user) {
		return <Navigate to={configs.routes.login} />;
	}

	return <>{children}</>;
};

export default PrivateRoute;
