import React from 'react';
import { Modal } from 'react-bootstrap';

const CreateGroupModal = ({ show, handleClose }) => {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Tạo nhóm</Modal.Title>
			</Modal.Header>
			<Modal.Body>Tạo nhóm trò chuyện</Modal.Body>
		</Modal>
	);
};

export default CreateGroupModal;
