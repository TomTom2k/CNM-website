import { useContext, useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useConversation } from '../context/ConversationToken';
import { ConversationToken } from '../context/ConversationToken';

const useListenConversation = () => {
	const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();
	const { setNewConversation, setConversations, conversationSelected, setConversationSelected, setHaveNewMessageConversations } = useContext(ConversationToken);

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

		socket?.on('addMemberIntoConversation', (resData) => {
            if(conversationSelected?.conversationId === resData.conversationId){
				let updatedParticipantIds = conversationSelected.participantIds.filter(participantId => !resData.addedParticipantIds.includes(participantId.participantId))
                updatedParticipantIds.push(...resData.addedParticipantIds)
                conversationSelected.membersInfo.push(...resData.membersInfo)
                conversationSelected.participantIds = updatedParticipantIds
                setConversationSelected((prev) => ({...conversationSelected}))
                setMessages((prevMessages) =>
                    prevMessages ? [...prevMessages, ...resData.messages] : [...resData.messages]
                );
                setHaveNewMessageConversations([{conversationId: conversationSelected.conversationId, message: resData.messages[resData.messages.length -1]}])
            } else {
                setHaveNewMessageConversations([{conversationId: resData.conversationId, message: resData.messages[resData.messages.length -1]}])
			}
		});

		socket?.on('removeMemberOutOfConversation', (resData) => {
            if(conversationSelected?.conversationId === resData.conversationId){
                conversationSelected.membersInfo = conversationSelected.membersInfo.filter(member => {
					return member.userID !== resData.RemovedUserId
				})
				conversationSelected.participantIds = conversationSelected.participantIds.filter(participantId => participantId.participantId !==  resData.RemovedUserId)
				setConversationSelected((prev) => ({...conversationSelected}))
				setMessages((prevMessages) =>
					prevMessages ? [...prevMessages, resData.savedMessage] : [resData.savedMessage]
				);
				setHaveNewMessageConversations([{conversationId: conversationSelected.conversationId, message: resData.savedMessage}])
            } else {
				setHaveNewMessageConversations([{conversationId: resData.conversationId, message: resData.savedMessage}])
			}
		});

		socket?.on('changeOwnerOfConversation', (resData) => {
            if(conversationSelected?.conversationId === resData.conversationId){
				conversationSelected.participantIds = resData.participantIds
				conversationSelected.membersInfo = resData.membersInfo
				setConversationSelected((prev) => ({...conversationSelected}))
				setMessages((prevMessages) =>
					prevMessages ? [...prevMessages, resData.savedMessage] : [resData.savedMessage]
				);
				setHaveNewMessageConversations([{conversationId: conversationSelected.conversationId, message: resData.savedMessage}])
            } else {
				setHaveNewMessageConversations([{conversationId: resData.conversationId, message: resData.savedMessage}])
			}
		});

		return () => {
			socket?.off('newConversation');
			socket?.off('deleteConversation');
			socket?.off('addMemberIntoConversation');
			socket?.off('removeMemberOutOfConversation');
			socket?.off('changeOwnerOfConversation');
		}
	}, [socket, setMessages, messages]);
};

export default useListenConversation;
