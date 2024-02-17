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
		requireAuth: true,
	},
	{
		path: configs.routes.login,
		component: Login,
		requireAuth: false,
	},
	{
		path: configs.routes.register,
		component: Register,
		requireAuth: false,
	},
	{
		path: configs.routes.profile,
		component: Profile,
		requireAuth: true,
	},
	{
		path: configs.routes.contacts,
		component: Contacts,
		requireAuth: true,
	},
];

export default routing;
