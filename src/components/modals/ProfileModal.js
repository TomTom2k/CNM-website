import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthToken } from '../../context/AuthToken';

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
