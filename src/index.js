import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvide from './context/AuthToken';
import GlobalStyle from './components/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthProvide>
		<GlobalStyle />
		<App />
	</AuthProvide>
);
