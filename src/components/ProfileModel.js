import React, { useContext } from 'react';
import { AuthToken } from '../context/AuthToken';
import { Modal } from 'react-bootstrap';

const ProfileModel = ({ show, handleClose }) => {
	const { user } = useContext(AuthToken);
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Thông tin tài khoản</Modal.Title>
			</Modal.Header>
			<Modal.Body>{user.fullName}</Modal.Body>
		</Modal>
	);
};

export default ProfileModel;
