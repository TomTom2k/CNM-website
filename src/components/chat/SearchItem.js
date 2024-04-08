import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { AuthToken } from '../../context/AuthToken';
import conversationApi from '../../api/conversationApi';
import { ConversationToken } from '../../context/ConversationToken';
import userApi from '../../api/userApi';
import { toast, Toaster } from "react-hot-toast";

const ItemStyled = styled.div`
	margin: 0 -1rem;
	padding: 0 1rem;
	&:hover {
		background-color: var(--color-60);
	}
`;

const InfoStyled = styled.div`
	flex: 1;
	display: flex;
	padding: 0.25rem 0;
	cursor: pointer;

	img {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background-color: white;
		border: 1px solid var(--color-60);
		margin-right: 0.5rem;
	}
	> div {
		> * {
			margin: 0;
		}
		p {
			color: #777;
			font-size: 0.75rem;
		}
	}
`;

const SearchItem = ({ userItem }) => {
	const { user } = useContext(AuthToken);
	const { setConversationSelected } = useContext(ConversationToken);

	const handleFriendRequest = async () => {
		try {
			await userApi.sentRequestAddFriend(user.userID, userItem.userID);
			toast.success("Đã gửi lời mời kết bạn");
		} catch (error) {
		  	console.log('Error:', error);    
		}
	};


	const handlerItem = async () => {
		try {
			const res = await conversationApi.createConversation({
				participantIds: [user.userID, userItem.userID],
			});
			if (res?.conversation) {
				setConversationSelected(res?.conversation);
			}
		} catch (error) {}
	};
	return (
		<ItemStyled
			className="d-flex justify-content-between mb-1"
			onClick={handlerItem}
		>
			<Toaster toastOptions={{ duration: 1500 }} />
			<InfoStyled>
				<img src={userItem?.profilePic} alt="" />
				<div>
					<b>{userItem?.fullName}</b>
					<p>{userItem?.phoneNumber}</p>
				</div>
			</InfoStyled>
			<div className="d-flex align-items-center">
				<Button className="py-2" onClick={handleFriendRequest}>Gửi kết bạn</Button>
			</div>
		</ItemStyled>
	);
};

export default SearchItem;
