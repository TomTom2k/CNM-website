import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

import {
	IoChatbubbleEllipsesOutline,
	IoChatbubbleEllipsesSharp,
} from 'react-icons/io5';
import { RiContactsBookLine, RiContactsBookFill } from 'react-icons/ri';

import configs from '../../configs';

const NavbarStyled = styled(Nav)`
	margin-top: 0.2rem;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const NavItemStyled = styled(Nav.Link)`
	width: 100%;
	padding: 1.2rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 1.7rem;
	transition: background-color 0.3s ease;

	&:hover {
		background: var(--layer-background-leftmenu-hover);
	}

	&.active {
		background: var(--layer-background-leftmenu-selected);
	}
`;

const navItems = [
	{
		defaultIcon: IoChatbubbleEllipsesOutline,
		activeIcon: IoChatbubbleEllipsesSharp,
		to: configs.routes.home,
		tooltip: 'Tin nhắn',
	},
	{
		defaultIcon: RiContactsBookLine,
		activeIcon: RiContactsBookFill,
		to: configs.routes.contacts,
		tooltip: 'Danh bạ',
	},
];

const NavIcon = ({ isActive, Icon }) => {
	return isActive ? <Icon /> : <Icon />;
};

const Navbar = () => {
	const location = useLocation();
	return (
		<NavbarStyled>
			{navItems.map((navItem, index) => (
				<OverlayTrigger
					key={index}
					placement="right"
					overlay={<Tooltip>{navItem.tooltip}</Tooltip>}
				>
					<NavItemStyled
						as={Link}
						to={navItem.to}
						className={
							location.pathname === navItem.to ? 'active' : ''
						}
					>
						<NavIcon
							Icon={
								location.pathname === navItem.to
									? navItem.activeIcon
									: navItem.defaultIcon
							}
							isActive={location.pathname === navItem.to}
						/>
					</NavItemStyled>
				</OverlayTrigger>
			))}
		</NavbarStyled>
	);
};

export default Navbar;
