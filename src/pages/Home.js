import React from 'react';
import styled from 'styled-components';

import ConversationList from '../components/chat/ConversationList';
import ChatBox from '../components/chat/ChatBox';
import ConversationProvide from '../context/ConversationToken';

const WrapperStyled = styled.div`
	display: flex;
`;

const Home = () => {
	return (
		<ConversationProvide>
			<WrapperStyled>
				<ConversationList />
				<ChatBox />
			</WrapperStyled>
		</ConversationProvide>
	);
};

export default Home;
