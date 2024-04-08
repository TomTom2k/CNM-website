/* eslint-disable array-callback-return */
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AuthToken } from '../../context/AuthToken';
import { ConversationToken } from '../../context/ConversationToken';
import Button from '../common/Button';
import { SiTinyletter } from "react-icons/si";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { GrGroup } from "react-icons/gr";
import { CgUserList } from "react-icons/cg";
import { GrSend } from "react-icons/gr";
import userApi from '../../api/userApi';
import { toast, Toaster } from "react-hot-toast";

const HeaderChatStyled = styled.h3`
    box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.05);
    height: 3.5rem;
    margin: 0;
    text-align: left;
    line-height: 3.5rem;
    justify-content: center;
    padding: 0 1rem;

    font-size: 1.25rem;
    font-weight: 500;
    user-select: none;
`;

const InfoStyled = styled.div`
    flex: 1;
	display: flex;
	padding: 0.25rem 0;
	cursor: pointer;

	img {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background-color: white;
		border: 1px solid var(--color-60);
		margin-right: 0.5rem;
	}
	> div {
		> * {
			margin: 0;
		}
		p {
			color: #777;
			font-size: 0.75rem;
		}
	}
`;
const WrapContent = styled.div`
    padding: 1rem;
    display: flex;
 
`;


const AsideStyled = styled.aside`
	width: 100%;
	height: 100vh;
	position: sticky;
	top: 0;
	box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.16);

	background-color: rgba(0, 0, 0, 0.01);
`;

const FriendRequestSection = styled.div`
    width: 100%;
`;

const GroupListSection = styled.div`
    // Thêm các CSS cần thiết cho phần danh sách bạn bè
`;


const ListFriend = () => {
    const { user } = useContext(AuthToken);
    const { conversationSelected} =
    useContext(ConversationToken);
    const [requestedFriends, setRequestedFriends] = useState([]);
    const [requestAddFriendsReceived, setRequestAddFriendsReceived] = useState([]);
    const [listFriend, setListFriend] = useState([]);

    useEffect(() => {
        if (conversationSelected && conversationSelected.icon === 'GrSend') {
            fetchRequestedFriends(conversationSelected.userInfo.user.listRequestAddFriendsSent);
        }
        if (conversationSelected && conversationSelected.icon === 'SiTinyletter') {
            fetchRequestAddFriendsReceived(conversationSelected.userInfo.user.listRequestAddFriendsReceived);
        }
        if (conversationSelected && conversationSelected.icon === 'CgUserList') {
            fetchListFriend(conversationSelected.userInfo.user.friends);
        }
    }, [conversationSelected]);

    const fetchRequestedFriends = async (userIds) => {
        try {
            const requests = await Promise.all(userIds.map(userId => userApi.findUserById(userId)));
            setRequestedFriends(requests);
        } catch (error) {
            console.error("Error fetching requested friends:", error);
        }
    };

    const fetchRequestAddFriendsReceived = async (userIds) => {
        try {
            const requests = await Promise.all(userIds.map(userId => userApi.findUserById(userId)));
            setRequestAddFriendsReceived(requests);
        } catch (error) {
            console.error("Error fetching requested friends:", error);
        }
    };

    const fetchListFriend = async (userIds) => {
        try {
            const requests = await Promise.all(userIds.map(userId => userApi.findUserById(userId)));
            setListFriend(requests);
        } catch (error) {
            console.error("Error fetching requested friends:", error);
        }
    };

    if (!conversationSelected) {
        return null; // or you can return a loading indicator or default content
    }
    
    let IconComponent;

	switch (conversationSelected.icon) {
		case 'CgUserList':
			IconComponent = CgUserList;
			break;
		case 'GrGroup':
			IconComponent = GrGroup;
			break;
		case 'SiTinyletter':
			IconComponent = SiTinyletter;
			break;
        case 'GrSend':    
            IconComponent = GrSend;
            break;
		default:
			IconComponent = LiaUserFriendsSolid;
	}

    console.log("conversationSelected",conversationSelected); 
    
    const handleCancelFriendRequest = async (requestedFriend) => {
        try {
            await userApi.cancelFriend(user.userID, requestedFriend.user.userID);
            toast.success("Hủy kết bạn thành công");
        } catch (error) {
            console.error("Error canceling friend request:", error);
        }
	};

    const handleSuccessAddFriendRequest = async (requestedFriend) => {
        // console.log("requestedFriend",user.userID +","+ requestedFriend.user.userID);
        try {
            await userApi.addFriend(user.userID, requestedFriend.user.userID);
            toast.success("Đồng ý kết bạn thành công");
        } catch (error) {
            console.error("Error canceling friend request:", error);
        }

    };

    const handleDeleteFriend = async (requestedFriend) => {
        try {
            await userApi.deleteFriend(user.userID, requestedFriend.user.userID);
            toast.success("Xóa bạn thành công");
        } catch (error) {
            console.error("Error canceling friend request:", error);
        }
    }
    return (
        <>
            <AsideStyled>
                <HeaderChatStyled>
                    <IconComponent size={30} style={{ marginRight: '1rem' }} />
                    {conversationSelected?.name}
                </HeaderChatStyled>
                <WrapContent>
                    <Toaster toastOptions={{ duration: 1500 }} />
                    {/* Hiển thị danh sách bạn, danh sách bạn bè hoặc danh sách lời mời kết bạn tương ứng */}
                    {conversationSelected.icon === 'CgUserList' && (
                        <FriendRequestSection>
                           {listFriend.map(requestedFriend => (
                                <WrapContent key={requestedFriend.user.userId}>
                                    <InfoStyled>
                                        <img src={requestedFriend.user.profilePic} alt="" />
                                        <div>
                                            <b>{requestedFriend.user.fullName}</b>
                                            <p>{requestedFriend.user.phoneNumber}</p>
                                        </div>
                                    </InfoStyled>
                                    <div className="d-flex align-items-center">
                                        <Button className="py-2"  onClick={() => handleDeleteFriend(requestedFriend)}>Xóa bạn</Button>
                                    </div>
                                </WrapContent>
                            ))}
                        </FriendRequestSection>
                    )}
                    {conversationSelected.icon === 'GrGroup' && (
                        <GroupListSection>
                            {/* Nội dung danh sách bạn bè */}
                            <h1>Chưa có vui lòng thêm nhóm</h1>
                        </GroupListSection>
                    )}
                    {conversationSelected.icon === 'SiTinyletter' && (
                        <FriendRequestSection>
                            {requestAddFriendsReceived.map(requestedFriend => (
                                <WrapContent key={requestedFriend.user.userId}>
                                    <InfoStyled>
                                        <img src={requestedFriend.user.profilePic} alt="" />
                                        <div>
                                            <b>{requestedFriend.user.fullName}</b>
                                            <p>{requestedFriend.user.phoneNumber}</p>
                                        </div>
                                    </InfoStyled>
                                    <div className="d-flex align-items-center">
                                        <Button className="py-2"  onClick={() => handleSuccessAddFriendRequest(requestedFriend)}>Đồng ý</Button>
                                    </div>
                                </WrapContent>
                            ))}
                   
                        </FriendRequestSection>
                    )}
                    {conversationSelected.icon === 'GrSend' && (
                        <FriendRequestSection>
                            {/* Lập qua danh sách  */}
                            {requestedFriends.map(requestedFriend => (
                                <WrapContent key={requestedFriend.user.userId}>
                                    <InfoStyled>
                                        <img src={requestedFriend.user.profilePic} alt="" />
                                        <div>
                                            <b>{requestedFriend.user.fullName}</b>
                                            <p>{requestedFriend.user.phoneNumber}</p>
                                        </div>
                                    </InfoStyled>
                                    <div className="d-flex align-items-center">
                                        <Button className="py-2"  onClick={() => handleCancelFriendRequest(requestedFriend)} style={{backgroundColor:"red"}}>Hủy</Button>
                                    </div>
                                </WrapContent>
                            ))}
                        </FriendRequestSection>
                    )}
                </WrapContent>
            </AsideStyled>
        </>
    );
};

export default ListFriend;
