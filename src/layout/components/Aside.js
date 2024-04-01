import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import Navbar from './Navbar';
import { AuthToken } from '../../context/AuthToken';
import { useNavigate } from 'react-router-dom';
import configs from '../../configs';
import ProfileModal from '../../components/modals/ProfileModal';

const WrapperStyled = styled.aside`
	width: 4rem;
	height: 100vh;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	top: 0;
	background-color: var(--color-30);
`;

const ProfilePicStyled = styled.div`
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	margin: 1rem 0;
	margin-top: 2rem;
	padding: 0.5rem;
	overflow: hidden;
	background-color: white;
	cursor: pointer;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
		background-color: white;
	}
`;

const PopoverStyled = styled(Popover)`
	user-select: none;
	width: 25rem;
	.popover-header {
		font-weight: bold;
	}
`;
const ProfileButton = styled.button`
	background-color: white;
	border: none;

	&:hover {
		opacity: 0.8;
	}
`;
const LogoutStyled = styled.button`
	color: red;
	background-color: white;
	border: none;

	&:hover {
		opacity: 0.8;
	}
`;

const Aside = () => {
	const profileRef = useRef(null);
	const navigate = useNavigate();
	const { user, logout } = useContext(AuthToken);
	const [showProfile, setShowProfile] = useState(false);

	const handleCloseProfile = () => setShowProfile(false);
	const handleShowProfile = () => setShowProfile(true);

	const handleLogoutButton = () => {
		logout();
		navigate(configs.routes.login);
	};

	return (
		<WrapperStyled ref={profileRef}>
			<OverlayTrigger
				trigger="click"
				placement="right"
				rootClose
				overlay={
					<PopoverStyled>
						<Popover.Header as="h3">{user.fullName}</Popover.Header>
						<Popover.Body>
							<ProfileButton onClick={handleShowProfile}>
								Thông tin cá nhân
							</ProfileButton>
							<hr />
							<LogoutStyled onClick={handleLogoutButton}>
								Đăng xuất
							</LogoutStyled>
						</Popover.Body>
					</PopoverStyled>
				}
			>
				<ProfilePicStyled>
					<img src={user.profilePic} alt="Ảnh đại diện" />
				</ProfilePicStyled>
			</OverlayTrigger>
			<Navbar />
			<ProfileModal show={showProfile} handleClose={handleCloseProfile} />
		</WrapperStyled>
	);
};

export default Aside;
