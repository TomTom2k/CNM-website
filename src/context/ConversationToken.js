import React, { createContext, useEffect, useState } from 'react';
import messageApi from '../api/messageApi';
import conversationApi from '../api/conversationApi';

export let ConversationToken = createContext();

const ConversationProvide = ({ children }) => {
	const [conversationSelected, setConversationSelected] = useState(null);
	const [conversations, setConversations] = useState([]);

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const res = await conversationApi.getConversations();
				setConversations(res.conversations);
			} catch (error) {
				console.log(error);
			}
		};
		fetchConversations();
	}, []);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				if (conversationSelected) {
					const res = await messageApi.getMessages(
						conversationSelected.conversationId
					);
					setMessages(res.messages);
				}
			} catch (error) {
				console.log('Error fetching message');
			}
		};
		fetchMessages();
	}, [conversationSelected]);

	return (
		<ConversationToken.Provider
			value={{
				conversationSelected,
				setConversationSelected,
				conversations,
				messages,
				setMessages,
			}}
		>
			{children}
		</ConversationToken.Provider>
	);
};

export default ConversationProvide;
