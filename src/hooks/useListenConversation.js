import { useContext, useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useConversation } from '../context/ConversationToken';
import { ConversationToken } from '../context/ConversationToken';

const useListenConversation = () => {
	const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();
	const { setNewConversation, setConversations, conversationSelected } = useContext(ConversationToken);

	useEffect(() => {
		socket?.on('newConversation', (newConversation) => {
            setNewConversation(newConversation)
		});

        socket?.on('deleteConversation', (conversationId) => {
            if(conversationSelected?.conversationId === conversationId){
                setMessages(null)
            }
            setConversations((prev) => (prev.filter(conversation => conversation.conversationId !== conversationId)))
		});

		return () => {
			socket?.off('newConversation');
			socket?.off('deleteConversation');
		}
	}, [socket, setMessages, messages]);
};

export default useListenConversation;
