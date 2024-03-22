/* eslint-disable array-callback-return */
import React, { useContext, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import InputEmoji from 'react-input-emoji'
import { FaRegImage, FaRegFile } from 'react-icons/fa6';

import { AuthToken } from '../../context/AuthToken';
import { ConversationToken } from '../../context/ConversationToken';
import messageApi from '../../api/messageApi';
import Button from '../common/Button';

import ChatImage from '../../assets/images/chat_image.jpg';
import useListenMessage from '../../hooks/useListenMessage';
import MessageItem from './MessageItem';

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
	background-color: #eef0f1;


	.chat-time {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		span {
			font-size: 0.8rem;
			color: white;
			background-color: rgba(0, 0, 0, 0.2);
			padding: 0.2rem 0.8rem;
			border-radius: 0.6rem;
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
	const [newMessage, setNewMessage] = useState("");
	useListenMessage();
	const { user } = useContext(AuthToken);
	const { conversationSelected, messages, setMessages } =
	useContext(ConversationToken);
	const messageItemRef = useRef()

	const handleChangeMessage = (newMessage) => {
		setNewMessage(newMessage)
	}

	const handleChooseImage = () => {
		let input = document.createElement('input');
		input.type = 'file';
		input.accept = "image/*"
		input.multiple = true
		input.click();
		input.onchange = async e => { 
			let files = e.target.files;
			let data = new FormData()
			if (files.length !== 0) {
				for (const single_file of files) {
					data.append('file', single_file)
				}
				data.append('conversationId', conversationSelected.conversationId)
				data.append('type', "image")
			}
			try {
				const res = await messageApi.sendMessage(data);
				setMessages((prevMessages) =>
					prevMessages ? [...prevMessages, ...res.message] : [...res.message]
				);
			} catch (error) {
				console.log(error);
			} finally {
				setNewMessage("")
			}
		}
	}

	const handleChooseFile = () => {
		let input = document.createElement('input');
		input.type = 'file';
		input.accept = "application/*, text/*"
		input.multiple = true
		input.click();
		input.onchange = async e => { 
			let files = e.target.files;
			let data = new FormData()
			if (files.length !== 0) {
				for (const single_file of files) {
					data.append('file', single_file)
				}
				data.append('conversationId', conversationSelected.conversationId)
				data.append('type', "file")
			}
			try {
				const res = await messageApi.sendMessage(data);
				setMessages((prevMessages) =>
					prevMessages ? [...prevMessages, ...res.message] : [...res.message]
				);
			} catch (error) {
				console.log(error);
			} finally {
				setNewMessage("")
			}
		}
	}

	const handlerSendButton = async () => {
		if(newMessage.trim() !== ""){
			try {
				const res = await messageApi.sendMessage({
					content: newMessage,
					conversationId: conversationSelected.conversationId,
					type: "text"
				});
				setMessages((prevMessages) =>
					prevMessages ? [...prevMessages, ...res.message] : [...res.message]
				);
			} catch (error) {
				console.log(error);
			} finally {
				setNewMessage("")
			}
		}
	};

	const handleOnEnter = () => {
		handlerSendButton()
	}

	const handleOnScrollChatContent = () => {
		messageItemRef.current.hideTippy()
	}

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
					<ContentChatStyled onScroll={() => handleOnScrollChatContent()}>
						{messages.map((message, index, arr) => (
							<>
								{
									(arr[index-1] && new Date(message.createdAt).getTime() - new Date(arr[index-1].createdAt).getTime() > 1800000) || !arr[index-1] 
									? 
									<div className='chat-time'>
										<span>
											{`
												${new Date(message.createdAt).getHours().toString().padStart(2, '0')}:${new Date(message.createdAt).getMinutes().toString().padStart(2, '0')} 
												${new Date(message.createdAt).getDate().toString().padStart(2, '0')}/${(new Date(message.createdAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(message.createdAt).getFullYear()}
											`}
										</span>
									</div>
									: null 
								}
								<MessageItem ref={messageItemRef} user={user} message={message} index={index} arr={arr}/>
							</>
						))}
					</ContentChatStyled>
					<SendMessageInputStyled>
						<SendMediaStyled className="p-0 g-0">
							<FaRegImage onClick={() => handleChooseImage()}/>
							<FaRegFile onClick={() => handleChooseFile()}/>
						</SendMediaStyled>
						<InputMessageStyled className="p-0 g-0">
							<Col md={11}>
								<InputEmoji
									value={newMessage}
									onChange={handleChangeMessage}
									placeholder="Nhập tin nhắn để gửi"
									onEnter={handleOnEnter}
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
