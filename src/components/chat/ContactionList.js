import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBox from '../SearchBox';
import { AuthToken } from '../../context/AuthToken';
import { useSocketContext } from '../../context/SocketContext';
import Contaction from './Contaction';
import { ConversationToken } from '../../context/ConversationToken';
import userApi from '../../api/userApi';
import ListFriend from './ListFriend';

const AsideStyled = styled.aside`
    min-width: 21.5rem;
    max-width: 21.5rem;
	height: 100vh;
	position: sticky;
	top: 0;
    border-right: 1px solid var(--border);

	background-color: rgba(0, 0, 0, 0.01);
`;

const AsideStyledContent = styled.aside` 
    width: calc(100% - 21.5rem);  
`;
const WrapperStyled = styled.div`
    width: 100%;
	display: flex;
`;

const ListStyled = styled.div`
    width: 100%;
`;

const ConversationList = () => {
    
	const { user } = useContext(AuthToken);
	const { setConversationSelected } = useContext(ConversationToken);
    const [userInfo, setUserInfo] = useState(null);

 	useEffect(() => {
		const fetchData = async () => {
			const response = await userApi.inFoUser(user.userID);
			setUserInfo(response);
		};
		fetchData();
	}, [user.userID]);

    const defaultContacts = userInfo ? [
        { id: 1, name: 'Danh sách bạn bè', icon: 'CgUserList', onClick: () => handleItemClick(1), userInfo },
        { id: 2, name: 'Danh sách nhóm', icon: 'GrGroup', onClick: () => handleItemClick(2), userInfo },
        { id: 3, name: 'Lời mời kết bạn', icon: 'SiTinyletter', onClick: () => handleItemClick(3), userInfo},
        { id: 4, name: 'Danh sách đã gửi', icon: 'GrSend', onClick: () => handleItemClick(4), userInfo },
    ] : [];

    useEffect(() => {
        if (defaultContacts.length > 0) {
            setConversationSelected(defaultContacts[0]);
        }
    }, [userInfo]);

    const handleItemClick = async (id) => {
        console.log(`Item with id ${id} clicked`);
		console.log("API data:", userInfo);
    };
    
    const displayedContacts = defaultContacts.slice(0, 4);
    return (
        <WrapperStyled>
            <AsideStyled>
                <SearchBox />
                <ListStyled> 
                    {displayedContacts.map((contaction, index) => (
                        <Contaction key={index} contaction={contaction} />
                    ))}
                </ListStyled>
            </AsideStyled>
            <AsideStyledContent>
                <ListFriend />
            </AsideStyledContent>

        </WrapperStyled>
    );
};
export default ConversationList;