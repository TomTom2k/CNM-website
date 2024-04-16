/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from 'react';
import { Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { toast, Toaster } from "react-hot-toast";

import { AuthToken } from '../../context/AuthToken';
import { ConversationToken } from '../../context/ConversationToken';
import conversationApi from '../../api/conversationApi';

const ModalStyled = styled(Modal)`
	.modal-dialog{
		max-width: 400px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 15rem;
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
				padding: 0.8rem;
				form {
					.form-control{
						font-size: 0.9rem;
						border-radius: 0.2rem;
						&:focus {
							box-shadow: none;
						}
					}
					.form-check{
						font-size: 0.9rem;
					}
				}
			}
		}
	}

	hr {
		margin: 0.8rem 0;
	}
`;

const NoteLabelStyled = styled.p`
    font-size: 0.9rem;
    margin-bottom: 0;
`;
const FormFooterStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 2rem;
	
	.cancel-btn, .leave-btn {
		border-radius: 0.2rem;
		padding: 0.6rem 1rem;
		font-weight: 600;
		font-size: 0.94rem;
		border: none;
	}

	.cancel-btn {
		background-color: var(--button-neutral-normal);
		color: var(--button-neutral-text);

		&:hover {
			background-color: var(--button-neutral-hover);
		}
	}

	.leave-btn {
        background-color: var(--button-danger-normal);
        color: var(--button-danger-text);

		&:hover {
            background-color: var(--button-danger-hover);
		}
	}
`;


const LeaveGroupForMembersModal = ({ show, handleClose, setCurrentMembers }) => {
	const { user } = useContext(AuthToken);
	const { conversationSelected, setConversationSelected } = useContext(ConversationToken);

    const handleConfirmLeaveGroup = async () => {
        try {
            //Call api xóa thành viên ở đây với conversationId và userID của thành viên muốn xóa
            console.log(conversationSelected.conversationId, user.userID)
			handleClose()
        } catch (error) {
            console.log(error)
        }
    }

	return (
		<ModalStyled show={show} onHide={handleClose}>
			<Toaster toastOptions={{ duration: 4000 }}/>
			<Modal.Header closeButton>
				<Modal.Title>
					<Row className=" justify-content-between">
						<Col md={12}>
							<p className="m-0">Rời nhóm và xóa trò chuyện?</p>
						</Col>
					</Row>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{!user ? (
					<Container>
						<Row className="justify-content-center py-5">
							<Spinner animation="border" role="status">
								<span className="visually-hidden">
									Loading...
								</span>
							</Spinner>
						</Row>
					</Container>
				) : (
					<Container>
						<Form>
                            <Form.Label className='mb-2'>
								<NoteLabelStyled>
                                    Bạn sẽ không thể xem lại tin nhắn trong nhóm này sau khi rời nhóm.
                                </NoteLabelStyled>
							</Form.Label>
						</Form>
						<FormFooterStyled>
     						<Button className='cancel-btn mx-2' variant="secondary" onClick={handleClose}>Hủy</Button>
							<Button 
								className='leave-btn' 
								variant="primary"
                                onClick={() => handleConfirmLeaveGroup()}
							>
								Rời nhóm
							</Button>
						</FormFooterStyled>
					</Container>
				)}
			</Modal.Body>
		</ModalStyled>
	);
};

export default LeaveGroupForMembersModal;
