import React, { useState, useContext, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { FaRegImage, FaRegFile, FaRegTrashCan, FaShare, FaQuestion } from 'react-icons/fa6';
import { FaEllipsisH, FaRev } from 'react-icons/fa';


import { AuthToken } from '../../context/AuthToken';
import { ConversationToken } from '../../context/ConversationToken';
import messageApi from '../../api/messageApi';
import Button from '../common/Button';

import ChatImage from '../../assets/images/chat_image.jpg';
import useListenMessage from '../../hooks/useListenMessage';

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
	position: relative; 
	background-color: #f5f5f5;

	.delete-icon {
		color: red;
	}

	.revoke-message {
		font-style: italic; // Có thể thêm các hiệu ứng khác để nổi bật tin nhắn đã xóa
		font-size: 0.75rem;
    	color: gray;
	}

	.delete-message {
		font-style: italic; // Có thể thêm các hiệu ứng khác để nổi bật tin nhắn đã xóa
		font-size: 0.75rem;
    	color: red;
	}

	div {
		position: relative; 
		padding-right:100px;
		padding-left:0;
		// background-color: red;
		p {
			max-width: 100%;
			border-radius: 1rem;
			padding: 1rem;
			background-color: #fff;
			transition: background-color 0.3s; 
			color: #081c36;
		}
	
		&:hover {
		  opacity: 0.8;
		  cursor: pointer;
	
		  .group_icon {
			display: block;
			padding-left: 60px; 
		  }
		}
		.share-icon{
			margin-right: -15px;
		}

		.group_icon {
			display: none; 
			position: absolute;
			top: 40%;
			right: -50px;	
			transform: translateY(-50%);
			cursor: pointer;
			color:black;
		}

		// .self
		&.self {
			color: black;
			align-self: flex-end;
			position: relative;
			padding-left:100px;
			padding-right:0px;
			p {
				background-color: #e5efff;
				color: #081c36;
			}
			
			.group_icon {
				display: none;
				left: 0px;
				right: 0px;
				with:20%;
				top: 40%;
				position: absolute;
				color:black;
				
			  }

			.share-icon{
				margin-left: -15px;
			}
			
			&:hover {
			    opacity: 0.8;
				cursor: pointer;
		  
				.group_icon {
				  display: block;
				  padding-left: 48px;
				}

				
			}
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
	const [showPopup, setShowPopup] = useState(false);
	const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

	const inputMessageRef = useRef(null);
	useListenMessage();
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
			setMessages((prevMessages) =>
				prevMessages ? [...prevMessages, res.message] : [res.message]
			);
		} catch (error) {
			console.log(error);
		} finally {
			inputMessageRef.current.value = null;
		}
	};

	const handleEllipsisClick = async (event, messageId) => {
		const rect = event.target.getBoundingClientRect();
		const top = rect.top + window.scrollY + 20;
		const left = rect.left + window.scrollX - 100;
		console.log(top, left, messageId);
		console.log(popupPosition);
		console.log(popupPosition.messageId);
		console.log(messages)
		console.log(messages.find(message => message.messageId === messageId));

		// setPopupPosition({ top, left, messageId });
		setPopupPosition(prevPosition => ({
			...prevPosition,
			top,
			left,
			messageId // Thêm messageId vào popupPosition nếu có
		}));
		setShowPopup(true);
	};

	const handleRevokeMessage = async (messageId) => {
		try {
			if (!messageId) {
				console.log("messageId không xác định.");
				return;
			}
			setMessages(prevMessages =>
				prevMessages.map(message =>
					message.messageId === messageId
						? { ...message, content: "Tin nhắn này đã được thu hồi" }
						: message
				)
			);
			await messageApi.revokeMessage(messageId);
			console.log(messageId + " đã được thu hồi thành công")
		} catch (error) {
			console.log(error);
		} finally {
			setShowPopup(false);
		}

	};

	const handleDeleteMessage = async () => {
		try {
			// setMessages(prevMessages =>
			// 	prevMessages.filter(message => message.messageId !== popupPosition.messageId)
			// );
			setMessages(prevMessages =>
				prevMessages.map(message =>
					message.messageId === popupPosition.messageId
						? { ...message, content: "Tin nhắn này đã bị xóa", selfDelete: true } // Thêm selfDelete vào tin nhắn bị xóa
						: message
				)
			);
			console.log(popupPosition.messageId);
			const deleted = await messageApi.deleteMessage(popupPosition.messageId);
			if (deleted) {
				console.log('Tin nhắn đã được xóa thành công');
				// Xử lý các hành động khác sau khi xóa tin nhắn thành công
				//Hiden message deleted

			} else {
				console.log('Không thể xóa tin nhắn');
				// Xử lý các hành động khác nếu không thể xóa tin nhắn
			}
		} catch (error) {
			console.log(error);
		} finally {
			setShowPopup(false);
		}
	};
	// 84334127449
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
							!(message.senderId === user.userID && message.selfDelete) && (
								<div key={message.messageId} className={user.userID === message?.senderId ? 'self' : ''}>
									<p className={(message.content === "Tin nhắn này đã được thu hồi") ? "revoke-message" : ""}>
										{message.content}
									</p>
									<div className="group_icon ellipsisH-icon" onClick={(e) => handleEllipsisClick(e, message.messageId)}>
										<FaEllipsisH className="ellipsisH-icon" />
									</div>
									<div className="group_icon share-icon" onClick={(e) => handleEllipsisClick(e, message.messageId)}>
										<FaShare className="share-icon" />
									</div>
								</div>
							)
						))}
					</ContentChatStyled>
					{
						showPopup && (
							<div
								style={{
									position: 'absolute',
									top: popupPosition.top,
									left: popupPosition.left,
									backgroundColor: 'white',
									boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
									padding: '10px',
									borderRadius: '5px',
									zIndex: 999
								}}
							>
								<div
									style={{
										cursor: 'pointer',
										padding: '5px 0',
										fontSize: '15px',
										borderTop: '1px solid #f1f1f1',
										color: 'black'
									}}

								>
									<div>
										<FaQuestion className="rev-icon" /> Chưa có
									</div>
								</div>
								<div
									style={{
										cursor: 'pointer',
										padding: '5px 0',
										fontSize: '15px',
										borderTop: '1px solid #f1f1f1',
										color: 'black'
									}}

								>
									<div>
										<FaQuestion className="rev-icon" /> Chưa có
									</div>
								</div>
								<div
									style={{
										cursor: 'pointer',
										padding: '5px 0',
										fontSize: '15px',
										borderTop: '1px solid #f1f1f1',
										color: 'red'
									}}
									onClick={() => handleRevokeMessage(popupPosition.messageId)}
								>
									<div>
										<FaRev className="rev-icon" /> Thu hồi
									</div>
								</div>
								<div
									style={{
										cursor: 'pointer',
										padding: '5px 0',
										fontSize: '15px',
										color: 'red'
									}}
									onClick={() => handleDeleteMessage(popupPosition.messageId)}
								>
									<div >
										<FaRegTrashCan className="delete-icon" /> Xóa ở phía tôi
									</div>
								</div>
							</div>
						)
					}
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
