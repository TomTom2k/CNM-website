import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvide from './context/AuthToken';
import GlobalStyle from './components/GlobalStyle';
import ConversationProvide from './context/ConversationToken';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthProvide>
		<ConversationProvide>
			<GlobalStyle />
			<App />
		</ConversationProvide>
	</AuthProvide>
);
