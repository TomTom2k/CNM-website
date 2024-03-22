/* eslint-disable array-callback-return */
import React, { useContext, useState } from 'react';
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
import FileItem from './FileItem';

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

	.message-item {
		min-width: 10%;
		max-width: 50%;
		margin: 0.6rem;
		border-radius: 1rem;
		background-color: var(--color-60);

		&.short-time-message {
			margin: 0.6rem 0.6rem -0.4rem;
		}

		&.self {
			background-color: var(--color-30);
			color: black;
			align-self: flex-end;
		}

		&.no-background-color{
			background-color: transparent;

			.message-time {
				font-size: 0.8rem;
				padding: 0.2rem 0.5rem;
				margin-top: 0.2rem;
				display: inline-block;
				background-color: rgba(0, 0, 0, 0.2);
				color: white;
				border-radius: 1rem;
			}

			&.self {
				.message-time {
					float: right;
				}
			}
		}
		
		p {
			margin: 0;
			padding: 1rem 1rem;
			border-radius: 1rem;
		}
	
		.file-item {
			cursor: pointer;
			padding: 1rem 1rem;
			border-radius: 1rem;
		}

		.message-time {
			font-size: 0.8rem;
			padding: 0 1rem 0.6rem;
			display: block;
			margin-top: -0.4rem;
		}
	}
`;
const ImageBlock = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 100%;

	img {
		max-width: 100%;
		cursor: pointer;
		border-radius: 0.6rem;
		border: 2px solid transparent;

		&.block {
			width: 50%;
		}
		flex: 1;
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
						{messages.map((message, index, arr) => (
							<>
								{
									(arr[index-1] && new Date(message.createdAt).getTime() - new Date(arr[index-1].createdAt).getTime() > 1800000) || !arr[index-1] 
									? 
									<div className='chat-time'>
										<span>
											{`
												${new Date(message.createdAt).getHours().toString().padStart(2, '0')}:${new Date(message.createdAt).getMinutes().toString().padStart(2, '0')} 
												${new Date(message.createdAt).getDay().toString().padStart(2, '0')}/${new Date(message.createdAt).getMonth().toString().padStart(2, '0')}/${new Date(message.createdAt).getFullYear()}
											`}
										</span>
									</div>
									: null 
								}
								<div 
									className={`
										${user.userID === message?.senderId ? 'message-item self' : 'message-item'} 
										${message.type === 'image' ? 'no-background-color' : ''}
										${
											arr[index+1] 
											&& arr[index+1].senderId === message.senderId 
											&& new Date(arr[index+1].createdAt).getTime() - new Date(message.createdAt).getTime() <= 300000
											? 'short-time-message' : ''
										}
									`}
								>
									{(() => {
										if (message.type === "text") {
											return (
												<p>
													{message.content}
												</p>
											);
										} else if (message.type === "image") {
											const images = message.content.split(" ");
											return (
												<ImageBlock
													key={message.messageId}
													className='image-block'
												>
													{images.map((image, index) => {
														return (
															<img
																id={index}
																className={images.length > 1 ? 'block' : ''}
																key={index}
																src={image}
																alt={`img_${index}`}
																onClick={(e) => window.open(e.target.currentSrc)}
															/>
														);
													})}
												</ImageBlock>
											);
										} else if (message.type === "file") {
											const fileNameS3 = message.content.split("/");
											return (
												<FileItem
													fileName={fileNameS3[fileNameS3.length - 1].split(".").slice(2).join(".")}
													fileSize={fileNameS3[fileNameS3.length - 1].split(".")[1]}
													fileNameS3={fileNameS3[fileNameS3.length - 1]}
													className='file-item'
													onClick={() => window.open(message.content)}
												/>
											);
										}
									})()}
									{/* Điều kiện hiển thị thời gian của tin nhắn
										1. Nếu không có tin nhắn phía sau
										2. Nếu tin nhắn phía sau là của người khác
										3. Nếu tin nhắn phía sau cách tin nhắn hiện tại hơn 5 phút 
									*/}
									{
										arr[index+1] 
										&& arr[index+1].senderId === message.senderId 
										&& new Date(arr[index+1].createdAt).getTime() - new Date(message.createdAt).getTime() <= 1800000 
										? null
										: <span className='message-time'>{`${new Date(message.createdAt).getHours().toString().padStart(2, '0')}:${new Date(message.createdAt).getMinutes().toString().padStart(2, '0')}`}</span> 
									}
								</div>
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
