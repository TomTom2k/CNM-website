import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import PhoneInput from 'react-phone-number-input';

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
	const [phoneNumber, setPhoneNumber] = useState('');

	const handlePhoneInputChange = (event) => {
		setPhoneNumber(event.target.value);
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm bạn</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<PhoneInputStyled
					placeholder="Số điện thoại"
					value={phoneNumber}
					onChange={handlePhoneInputChange}
				/>
			</Modal.Body>
		</Modal>
	);
};

export default AddFriendModel;
