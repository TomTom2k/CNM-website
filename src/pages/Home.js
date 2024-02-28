import React, { useContext, useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { FaRegImage, FaRegFile } from 'react-icons/fa6';

import { AuthToken } from '../context/AuthToken';
import ConversationProvide, {
	ConversationToken,
} from '../context/ConversationToken';
import messageApi from '../api/messageApi';
import conversationApi from '../api/conversationApi';
import Conversation from '../components/Conversation';

import Button from '../components/common/Button';

const WrapperStyled = styled.div`
	display: flex;
`;
const AsideStyled = styled.aside`
	width: 25rem;
	height: 100vh;
	position: sticky;
	top: 0;
	box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.16);

	background-color: rgba(0, 0, 0, 0.01);
`;
const ChatBoxStyled = styled.div`
	width: 100%;
`;
const HeaderChatStyled = styled.h3`
	box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.05);
	height: 3.5rem;
	margin: 0;
	text-align: center;
	line-height: 3.5rem;

	font-size: 1.25rem;
	font-weight: 500;
	user-select: none;
`;
const ContentChatStyled = styled.div`
	height: calc(100vh - 10rem);
	overflow-y: scroll;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	p {
		max-width: 50%;
		border-radius: 1rem;
		padding: 1rem;
		background-color: var(--color-60);

		&.self {
			background-color: var(--color-30);
			color: white;
			align-self: flex-end;
		}
	}
`;
const SendMessageInputStyled = styled.div`
	height: 6.5rem;
	border-top: 1px solid var(--color-60);
`;
const SendMediaStyled = styled.div`
	display: flex;
	height: 3rem;
	border-bottom: 1px solid var(--color-60);

	> * {
		width: 3rem;
		height: 3rem;
		padding: 0.75rem;
		&:hover {
			background-color: var(--color-60);
			color: var(--color-10);
			cursor: pointer;
		}
	}
`;
const InputMessageStyled = styled(Row)`
	display: flex;
	input {
		padding: 0 2rem;
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
		font-size: 1.15rem;
		color: #555;
	}
`;

const Home = () => {
	const { conversationSelected } = useContext(ConversationToken);
	const { user } = useContext(AuthToken);
	const inputMessageRef = useRef(null);
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
	console.log(messages);
	const handlerSendButton = async () => {
		try {
			const message = inputMessageRef.current.value;
			const res = await messageApi.sendMessage({
				content: message,
				conversationId: conversationSelected.conversationId,
			});
			setMessages((prevMessages) => [...prevMessages, res.message]);
		} catch (error) {
		} finally {
			inputMessageRef.current.value = null;
		}
	};
	return (
		<WrapperStyled>
			<AsideStyled>
				{conversations.map((conversation, index) => (
					<Conversation key={index} conversation={conversation} />
				))}
			</AsideStyled>

			<ChatBoxStyled>
				<HeaderChatStyled>
					{conversationSelected?.name ||
						conversationSelected?.membersInfo?.find(
							(member) => member.userID !== user?.userID
						)?.fullName}
				</HeaderChatStyled>
				<ContentChatStyled>
					{messages.map((message) => (
						<p
							key={message.messageId}
							className={
								user.userID === message?.senderId ? 'self' : ''
							}
						>
							{message.content}
						</p>
					))}
				</ContentChatStyled>
				<SendMessageInputStyled>
					<SendMediaStyled className="p-0 g-0">
						<FaRegImage />
						<FaRegFile />
					</SendMediaStyled>
					<InputMessageStyled className="p-0 g-0">
						<Col md={11}>
							<input
								ref={inputMessageRef}
								type="text"
								placeholder="Nhập tin nhắn để gửi"
							/>
						</Col>
						<Col md={1}>
							<Button onClick={handlerSendButton}>Gửi</Button>
						</Col>
					</InputMessageStyled>
				</SendMessageInputStyled>
			</ChatBoxStyled>
		</WrapperStyled>
	);
};

export default Home;
