import React, { useContext } from 'react';
import styled from 'styled-components';
import Conversation from './Conversation';
import { ConversationToken } from '../../context/ConversationToken';
import SearchBox from '../SearchBox';
import { useSocketContext } from '../../context/SocketContext';

const AsideStyled = styled.aside`
	min-width: 21.5rem;
	max-width: 21.5rem;
	height: 100vh;
	position: sticky;
	top: 0;
	box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.16);

	background-color: rgba(0, 0, 0, 0.01);
`;

const ListStyled = styled.div``;
const ConversationList = () => {
	const { conversations } = useContext(ConversationToken);
	return (
		<AsideStyled>
			<SearchBox />
			<ListStyled>
				{conversations?.map((conversation, index) => (
					<Conversation key={index} conversation={conversation} />
				)) || (
					<p className="text-center mt-4">
						Chưa có cuộc trò chuyện nào
					</p>
				)}
			</ListStyled>
		</AsideStyled>
	);
};

export default ConversationList;
