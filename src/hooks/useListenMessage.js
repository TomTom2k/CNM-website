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

		socket?.on('recallMessage', (updatedMessage) => {
			console.log(messages);
			    // Tìm và cập nhật message trong danh sách messages
			const updatedMessages = messages.map(message => {
				if (message.messageId === updatedMessage.messageId) {
					// Cập nhật trạng thái của message
					message.isRecalled = true;
					// Trả về message đã được cập nhật
					return updatedMessage;
				}
				return message;
			});
		
			console.log(updatedMessages);
			
			// Cập nhật state của messages
			setMessages((prevMessages) => [...prevMessages]);
		});

		return () => {
			socket?.off('newMessage');
			socket?.off('recallMessage');
		}
	}, [socket, setMessages, messages]);
};

export default useListenMessage;
