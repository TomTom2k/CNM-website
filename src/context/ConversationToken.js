import React, { createContext, useState } from 'react';

export let ConversationToken = createContext();

const ConversationProvide = ({ children }) => {
	const [conversationSelected, setConversationSelected] = useState(null);
	const [messages, setMessages] = useState(null);

	return (
		<ConversationToken.Provider
			value={{
				conversationSelected,
				setConversationSelected,
				messages,
				setMessages,
			}}
		>
			{children}
		</ConversationToken.Provider>
	);
};

export default ConversationProvide;
