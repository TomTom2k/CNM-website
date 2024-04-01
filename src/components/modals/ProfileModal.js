import React, { useContext, useState } from 'react';
import { Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

import { CiCamera } from 'react-icons/ci';
import { HiPencilAlt } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';

import { AuthToken } from '../../context/AuthToken';

const PreButtonStyled = styled.div`
	cursor: pointer;
	&:hover {
		opacity: 0.8;
	}
`;
const GroupStyled = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	> svg {
		position: absolute;
		bottom: 0;
		right: calc(50% - 5rem);
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		padding: 0.5rem;
		background-color: var(--color-60);
		cursor: pointer;

		&:hover {
			filter: grayscale(100%);
		}
	}
`;
const AvatarStyled = styled.img`
	width: 10rem;
	height: 10rem;
	border-radius: 50%;
	object-fit: cover;
	display: inline-block;
	border: 2px solid white;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
`;
const LabelStyled = styled.p`
	color: #888;
`;
const ButtonStyled = styled.button`
	outline: none;
	border: none;
	padding: 0.5rem;
	background-color: white;
	transition: all linear 0.2s;
	&:hover {
		background-color: var(--color-60);
	}
`;

const ProfileModel = ({ show, handleClose }) => {
	const { user } = useContext(AuthToken);
	const [indexBody, setIndexBody] = useState(0);
	const [imagePreview, setImagePreview] = useState('');

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0];
		setImagePreview(URL.createObjectURL(selectedImage));
	};

	const items = [
		{
			key: 'info',
			title: 'Thông tin tài khoản',
			body: (
				<>
					<Container>
						<Row>
							<GroupStyled>
								<AvatarStyled src={user?.profilePic} alt="" />
								<CiCamera onClick={() => setIndexBody(1)} />
							</GroupStyled>
						</Row>
						<Row>
							<h4 className="text-center mt-2">
								{user?.fullName}
							</h4>
						</Row>
						<hr />
						<Row className="mt-2">
							<Col md={3}>
								<LabelStyled>Giới tính</LabelStyled>
								<LabelStyled>Điện thoại</LabelStyled>
								<LabelStyled>Ngày sinh</LabelStyled>
							</Col>
							<Col md={9}>
								<p>{user?.gender === 'male' ? 'Nam' : 'Nữ'}</p>
								<p>{user?.phoneNumber}</p>
								<p>Ngày sinh</p>
							</Col>
						</Row>
						<hr />
						<Row>
							<ButtonStyled onClick={() => setIndexBody(2)}>
								Cập nhật <HiPencilAlt />
							</ButtonStyled>
						</Row>
					</Container>
				</>
			),
		},
		{
			key: 'update-image',
			title: 'Cập nhật thông tin',
			body: (
				<>
					<div className="mb-3">
						<label htmlFor="photo" className="form-label">
							Room Photo
						</label>
						<input
							type="file"
							id="photo"
							name="photo"
							className="form-control"
							onChange={handleImageChange}
						/>
						{imagePreview && (
							<img
								src={imagePreview}
								alt="Preview Room Photo"
								style={{
									maxWidth: '100%',
								}}
								className="mb-3"
							/>
						)}
					</div>
				</>
			),
		},
		{
			key: 'update-info',
			title: 'Cập nhật thông tin',
			body: (
				<>
					<p>thông tin</p>
				</>
			),
		},
	];
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					<Row className=" justify-content-between">
						{!!indexBody && (
							<Col md={1}>
								<PreButtonStyled
									onClick={() => setIndexBody(0)}
								>
									<IoIosArrowBack />
								</PreButtonStyled>
							</Col>
						)}
						<Col md={indexBody ? 10 : 12}>
							<p className="m-0">{items[indexBody].title}</p>
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
					items[indexBody].body
				)}
			</Modal.Body>
		</Modal>
	);
};

export default ProfileModel;
