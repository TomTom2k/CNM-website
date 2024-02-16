import configs from '../configs';

import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Contacts from '../pages/Contacts';
import Home from '../pages/Home';

const routing = [
	{
		path: configs.routes.home,
		component: Home,
		roles: [configs.role.client],
		redirect: configs.routes.login,
	},
	{
		path: configs.routes.login,
		component: Login,
	},
	{
		path: configs.routes.register,
		component: Register,
	},
	{
		path: configs.routes.profile,
		component: Profile,
		roles: [configs.role.client],
		redirect: configs.routes.login,
	},
	{
		path: configs.routes.contacts,
		component: Contacts,
		roles: [configs.role.client],
		redirect: configs.routes.login,
	},
];

export default routing;
