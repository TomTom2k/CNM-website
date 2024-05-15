import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import PhoneInput from 'react-phone-number-input';
import { useDebounce } from '../../hooks';
import userApi from '../../api/userApi';
import SearchItem from '../chat/SearchItem';
import { AuthToken } from '../../context/AuthToken';


const ModalStyled = styled(Modal)`
    & + .modal-backdrop{
        z-index: 1059;
    }
	.modal-dialog{
		max-width: 410px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 3.5rem;
		margin-bottom: 0rem;
		position: relative;
		width: auto;
		pointer-events: none;

		.modal-content {
			border-radius: 0.3rem;
			.modal-header {
				padding: 0.8rem 1rem;			
				.modal-title {
					font-size: 1rem;
					font-weight: 700;
					width: 100%;
				}
				.btn-close {
					margin-left: 0;
				}
			}
			.modal-body {
				padding: 1rem 0rem;
			}
		}
	}

	hr {
		margin: 0.8rem 0;
	}
`;

const PhoneInputStyled = styled(PhoneInput)`
	margin-left: 1rem;
	margin-right: 1.2rem;
	& > * {
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
		padding: 5px 0;
		font-size: 0.9rem;
		&:focus {
			border-bottom-color: var(--border-focused);
		}
	}
`;

const FriendListStyled = styled.div`
	margin-top: 1.4rem;
	height: 31rem; 
	overflow-y: scroll;

	.friend-list-title {
		font-size: 0.85rem;
		padding-left: 1rem;
		color: var(--text-secondary);
		margin-bottom: 0.3rem;
	}
`;

const AddFriendModel = ({ show, handleClose }) => {
	const { user } = useContext(AuthToken);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [searchHistory, setSearchHistory] = useState(
		localStorage.getItem('searchHistory')
			? JSON.parse(localStorage.getItem('searchHistory'))
			: []
	);
	const [isLoading, setIsLoading] = useState(false);

	const debouncedValue = useDebounce(phoneNumber, 500);

	useEffect(() => {
		if (
			debouncedValue &&
			/^\+\d{11}$/.test(debouncedValue) &&
			debouncedValue !== user.phoneNumber
		) {
			const searchPhoneNumber = async () => {
				setIsLoading(true);
				try {
					const res = await userApi.findUser(debouncedValue);
					const newSearchResult = res?.users;

					// Lưu lại lịch sử tìm kiếm
					const userMap = new Map();
					searchHistory.forEach((user) =>
						userMap.set(user.userID, user)
					);
					newSearchResult.forEach((user) =>
						userMap.set(user.userID, user)
					);
					// Tạo một mảng mới từ các giá trị trong Map
					const updatedHistory = Array.from(userMap.values());

					localStorage.setItem(
						'searchHistory',
						JSON.stringify(updatedHistory)
					);

					setSearchHistory(updatedHistory);
					setSearchResult(newSearchResult);
				} catch (error) {
					console.log(error);
				} finally {
					setIsLoading(false);
				}
			};
			searchPhoneNumber();
		}
	}, [debouncedValue]);

	return (
		<ModalStyled show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm bạn</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<PhoneInputStyled
					placeholder="Số điện thoại"
					value={phoneNumber}
					onChange={setPhoneNumber}
				/>
				<FriendListStyled>
					<p className='friend-list-title'>Kết quả</p>
					{searchResult.map((user) => (
						<SearchItem key={user?.userID} userItem={user} />
					))}
					<p className='friend-list-title'>Lịch sử</p>
					{searchHistory.map((user) => (
						<SearchItem key={user?.userID} userItem={user} />
					))}
				</FriendListStyled>
			</Modal.Body>
		</ModalStyled>
	);
};

export default AddFriendModel;
