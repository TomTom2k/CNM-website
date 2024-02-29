import React, { useState } from 'react';
import styled from 'styled-components';

import {
	AiOutlineUserAdd,
	AiOutlineUsergroupAdd,
	AiOutlineSearch,
} from 'react-icons/ai';
import AddFriendModal from './modals/AddFriendModal';
import CreateGroupModal from './modals/CreateGroupModal';

const WrapperStyled = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid var(--color-60);
	padding: 1rem;

	> *:not(:first-child) {
		padding: 0.25rem;
		border-radius: 0.25rem;
		margin-left: 0.25rem;

		width: 2rem;
		height: 2rem;
		&:hover {
			background-color: var(--color-60);
			cursor: pointer;
		}
	}
`;

const SearchStyled = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	flex-grow: 1;

	input {
		position: relative;
		width: 100%;
		background-color: var(--color-60);
		padding: 0.25rem;
		padding-left: 2rem;
		border-radius: 0.25rem;
		border: none;
		outline: none;
	}

	& > :first-child {
		position: absolute;
		color: #555;
		top: 50%;
		transform: translateY(-50%);
		width: 2rem;
		height: 2rem;
		padding: 0.25rem;
		z-index: 1;
		cursor: pointer;
	}
`;

const SearchBox = () => {
	const [showAddFriendModal, setShowAddFriendModal] = useState(false);
	const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
	const handleShowAddFriendModal = () => {
		setShowAddFriendModal(true);
	};
	const handleCloseAddFriendModal = () => {
		setShowAddFriendModal(false);
	};
	const handleShowCreateGroupModal = () => {
		setShowCreateGroupModal(true);
	};
	const handleCloseCreateGroupModal = () => {
		setShowCreateGroupModal(false);
	};
	return (
		<WrapperStyled>
			<SearchStyled>
				<AiOutlineSearch />
				<input type="text" placeholder="Tìm kiếm" />
			</SearchStyled>
			<AiOutlineUserAdd onClick={handleShowAddFriendModal} />
			<AiOutlineUsergroupAdd onClick={handleShowCreateGroupModal} />

			{/* modal */}
			<AddFriendModal
				show={showAddFriendModal}
				handleClose={handleCloseAddFriendModal}
			/>
			<CreateGroupModal
				show={showCreateGroupModal}
				handleClose={handleCloseCreateGroupModal}
			/>
		</WrapperStyled>
	);
};

export default SearchBox;
