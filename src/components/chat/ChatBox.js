import React, { useContext, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { FaRegImage, FaRegFile } from 'react-icons/fa6';

import { AuthToken } from '../../context/AuthToken';
import { ConversationToken } from '../../context/ConversationToken';
import messageApi from '../../api/messageApi';
import Button from '../common/Button';

import ChatImage from '../../assets/images/chat_image.jpg';

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
const NoneConversationStyled = styled.div`
	width: 100%;
	height: 100vh;
	padding: 2rem;

	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 100%;
		max-width: 35rem;
		height: 100%;
		object-fit: contain;
	}
`;

const ChatBox = () => {
	const inputMessageRef = useRef(null);
	const { user } = useContext(AuthToken);
	const { conversationSelected, messages, setMessages } =
		useContext(ConversationToken);

	const handlerSendButton = async () => {
		try {
			const message = inputMessageRef.current.value;
			const res = await messageApi.sendMessage({
				content: message,
				conversationId: conversationSelected.conversationId,
			});
			setMessages((prevMessages) => [...prevMessages, res.message]);
		} catch (error) {
			console.log(error);
		} finally {
			inputMessageRef.current.value = null;
		}
	};
	return (
		<>
			{messages ? (
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
									user.userID === message?.senderId
										? 'self'
										: ''
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
			) : (
				<NoneConversationStyled>
					<img src={ChatImage} alt="" />
				</NoneConversationStyled>
			)}
		</>
	);
};

export default ChatBox;
