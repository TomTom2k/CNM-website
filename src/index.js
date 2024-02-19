import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvide from './authToken/AuthToken';
import GlobalStyle from './components/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthProvide>
		<GlobalStyle />
		<App />
	</AuthProvide>
);
