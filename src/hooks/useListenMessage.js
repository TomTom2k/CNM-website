import React, { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useConversation } from '../context/ConversationToken';

const useListenMessage = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on('newMessage', (newMessage) => {
			console.log(newMessage);
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		});

		return () => socket?.off('newMessage');
	}, [socket, setMessages, messages]);
};

export default useListenMessage;
