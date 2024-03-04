import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import PhoneInput from 'react-phone-number-input';
import { useDebounce } from '../../hooks';
import userApi from '../../api/userApi';
import SearchItem from '../chat/SearchItem';
import { AuthToken } from '../../context/AuthToken';

const PhoneInputStyled = styled(PhoneInput)`
	& > * {
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
		padding: 5px 0;
		font-size: 1rem;
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
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm bạn</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<PhoneInputStyled
					placeholder="Số điện thoại"
					value={phoneNumber}
					onChange={setPhoneNumber}
				/>
				<div className="mt-4">
					<p>Kết quả</p>
					{searchResult.map((user) => (
						<SearchItem key={user?.userID} userItem={user} />
					))}
					<p>Lịch sử</p>
					{searchHistory.map((user) => (
						<SearchItem key={user?.userID} userItem={user} />
					))}
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default AddFriendModel;
