import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthToken } from '../../context/AuthToken';
import { ConversationToken } from '../../context/ConversationToken';

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
	overflow: hidden img {
		width: 100%;
		height: 100%;
		object-fit: cover;
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
	}
`;
const Conversation = ({ conversation }) => {
	const { user } = useContext(AuthToken);
	const { conversationSelected, setConversationSelected } =
		useContext(ConversationToken);
	let title =
		conversation?.name ||
		conversation?.membersInfo?.find(
			(member) => member.userID !== user?.userID
		)?.fullName;

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
			<AvatarStyled>
				<img src="" alt="" />
			</AvatarStyled>
			<InfoStyled>
				<h6>{title}</h6>
				<p>{conversation?.lastMessage || 'Chưa có tin nhắn'}</p>
			</InfoStyled>
		</WrapperStyled>
	);
};

export default Conversation;
