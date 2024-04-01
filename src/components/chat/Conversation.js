import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthToken } from '../../context/AuthToken';
import { ConversationToken } from '../../context/ConversationToken';
import { useSocketContext } from '../../context/SocketContext';

const WrapperStyled = styled.div`
	padding: 0.5rem 1rem;
	display: flex;
	align-items: center;
	justify-items: center;
	&:hover {
		cursor: pointer;
		background-color: #eee;
	}
	&.active {
		background-color: var(--color-60);
	}
`;
const AvatarStyled = styled.div`
	height: 3.2rem;
	aspect-ratio: 1/1;
	border-radius: 50%;
	background-color: white;
	box-shadow: 0 0 4px 0.5px rgba(0, 0, 0, 0.05);
	position: relative;
	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;

		object-fit: cover;
	}

	&.online::after {
		content: '';
		position: absolute;
		right: 1px;
		width: 0.675rem;
		height: 0.675rem;
		background-color: #7de07d;
		border-radius: 50%;
	}
`;
const InfoStyled = styled.div`
	padding: 0 0.5rem;
	width: 60%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;

	h6 {
		width: 100%;
		margin: 0;
		font-size: 1rem;
		font-weight: 400;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	p {
		margin: 0;
		font-size: 0.75rem;
		color: gray;

		img {
			width: 1.2rem;
			height: 1.2rem;
		}
	}
`;
const Conversation = ({ conversation }) => {
	const { user } = useContext(AuthToken);
	const { onlineUsers } = useSocketContext();
	const { conversationSelected, setConversationSelected } =
		useContext(ConversationToken);

	const title =
		conversation?.name ||
		conversation?.membersInfo?.find(
			(member) => member.userID !== user?.userID
		)?.fullName;
	const isOnline = conversation.participantIds.some((id) =>
		onlineUsers.includes(id)
	);

	const handlerConversation = () => {
		setConversationSelected(conversation);
	};

	return (
		<WrapperStyled
			onClick={handlerConversation}
			className={
				conversation.conversationId ===
				conversationSelected?.conversationId
					? 'active'
					: ''
			}
		>
			<AvatarStyled className={isOnline ? 'online' : ''}>
				<img
					src={
						conversation?.membersInfo?.find(
							(member) => member.userID !== user?.userID
						)?.profilePic
					}
					alt=""
				/>
			</AvatarStyled>
			<InfoStyled>
				<h6>{title}</h6>
				{conversation?.lastMessageType === "like" ? (
					<p><img src={conversation.lastMessage} alt=''/></p>
				) : (
					<p>{conversation?.lastMessage || 'Chưa có tin nhắn'}</p>
				)}
			</InfoStyled>
		</WrapperStyled>
	);
};

export default Conversation;
