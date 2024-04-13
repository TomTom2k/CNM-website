import styled from 'styled-components';
import { useContext } from 'react';
import { MdArrowBackIos } from "react-icons/md";
import { AiOutlineEdit, AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbBellRinging } from "react-icons/tb";
import { BsPinAngle } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { IoKeyOutline } from "react-icons/io5";
import { ConversationToken } from '../../context/ConversationToken';

const WrapperStyled = styled.div`;
    width: 33.5%;
    border-left: 1px solid var(--border);
`;

const ConversationInfoHeaderStyled = styled.div`;
    height: 68px;
    user-select: none;
    border-bottom: 1px solid var(--border);
    display: flex;
	justify-content: center;
	align-items: center; 
    position: relative;

    .conversation-info-title{
        font-weight: 600;
        font-size: 1.1rem;
        margin: 0;
    }

    .back-conversation-info-icon {
        position: absolute;
        top: 1.45rem;
        left: 1.3rem;
        font-size: 1.2rem;
        cursor: pointer;
    }
`;

const ConversationInfoBodyStyled = styled.div`;
    height: calc(100vh - 68px);
    overflow-y: auto;
    /* Ẩn thanh cuộn cho các trình duyệt Chrome */
	&::-webkit-scrollbar {
		display: none;
	}

	/* Tùy chỉnh thanh cuộn cho các trình duyệt khác */
	scrollbar-width: none; /* Ẩn thanh cuộn */
	-ms-overflow-style: none; /* Ẩn thanh cuộn cho IE/Edge */
`;

const GroupInfoStyled = styled.div`;
    padding: 1rem 1rem 0.6rem 1rem;
    
    .group-avatar{
        height: 4.5rem;
        display: flex;
        justify-content: center;
        align-items: center; 

        img{
            width: 3.4rem;
            height: 3.4rem;
            border-radius: 50%;
            object-fit: cover;
        }
    }

    .group-name{
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        
        span {
            font-weight: 600;
        }

        .edit-group-name-icon{
            font-size: 1.5rem;
            position: absolute;
            top: 0.5rem;
            right: 4.6rem;
            padding: 0.2rem;
            border-radius: 50%;
            background-color: var(--button-neutral-normal);
            color: var(--button-neutral-text);
            cursor: pointer;
            &:hover{
                background-color: var(--button-neutral-hover);
            }
        }
    }

    .group-info-action{
        height: 5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 0.6rem;

        .group-info-action-detail{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .group-info-action-icon{
                padding: 0.4rem;
                font-size: 2rem;
                border-radius: 50%;
                background-color: var(--button-neutral-normal);
                color: var(--button-neutral-text);
                cursor: pointer;
                &:hover{
                    background-color: var(--button-neutral-hover);
                }
            }

            span{
                font-size: 0.76rem;
                color: var(--text-secondary);
                width: 4rem;
                text-align: center;
                margin-top: 0.5rem;
            }
        }
    }
`;

const SeparatedStyled = styled.div`;
    height: 0.5rem;
    background: #eef0f1;
`;

const MemberInfoStyled = styled.div`;
    padding: 0.8rem 0 0;

    h6 {
        padding: 0 1rem 0.14rem;
        font-weight: 600;
        font-size: 0.94rem;
    }

    .member-info-item{
        display: flex;
        align-items: center;
        padding: 0.845rem 1rem;
        cursor: pointer;
        &:hover {
            background-color: var(--layer-background-hover);
        }

        .member-info-icon {
            font-size: 1.28rem;
        }
        span{
            margin-left: 0.6rem;
            font-size: 0.875rem;
        }
    }
`;

const SecuritySettingStyled = styled.div`;
    padding: 0.8rem 0 0;

    h6 {
        padding: 0 1rem 0.14rem;
        font-weight: 600;
        font-size: 0.94rem;
    }

    .security-setting-item{
        display: flex;
        align-items: center;
        padding: 0.845rem 1rem;
        cursor: pointer;
        &:hover {
            background-color: var(--layer-background-hover);
        }
        color:  var(--text-errors);

        .security-setting-icon {
            font-size: 1.28rem;
        }
        span{
            margin-left: 0.6rem;
            font-size: 0.875rem;
        }
    }
`;

const ManageGroupStyled = styled.div`;
    padding: 0.8rem 0 0;

    h6 {
        padding: 0 1rem 0.14rem;
        font-weight: 600;
        font-size: 0.94rem;
    }

    .manage-group-item{
        display: flex;
        align-items: center;
        padding: 0.845rem 1rem;
        cursor: pointer;
        &:hover {
            background-color: var(--layer-background-hover);
        }

        .manage-group-icon {
            font-size: 1.28rem;
        }
        span{
            margin-left: 0.6rem;
            font-size: 0.875rem;
        }
    }
`;

const DeleteGroupStyled = styled.div`;
    padding: 1.9rem 1rem;

    .delete-group-item{
        padding: 0.45rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--button-secondary-danger-normal);
        color: var(--button-secondary-danger-text);
        font-weight: 600;
        font-size: 0.98rem;
        cursor: pointer;

        &:hover {
            background-color: var(--button-secondary-danger-hover);
        }
    }
`;

const ConversationInfo = () => {
    const { toggleConversationInfo, setToggleConversationInfo, conversationSelected } = useContext(ConversationToken);

    const items = [
		{
			key: 'group-info',
			title: 'Thông tin nhóm',
            body: (
                <>
                    <GroupInfoStyled>
                        <div className='group-avatar'>
                            <img src={conversationSelected?.avatar} alt=''/>
                        </div>
                        <div className='group-name'>
                            <span>{conversationSelected?.name}</span>
                            <AiOutlineEdit className='edit-group-name-icon'/>
                        </div>
                        <div className='group-info-action'>
                            <div className='group-info-action-detail'>
                                <TbBellRinging className='group-info-action-icon'/>
                                <span>Tắt thông báo</span>
                            </div>
                            <div className='group-info-action-detail'>
                                <BsPinAngle className='group-info-action-icon'/>
                                <span>Ghim hội thoại</span>
                            </div>
                            <div className='group-info-action-detail'>    
                                <AiOutlineUsergroupAdd className='group-info-action-icon'/>
                                <span>Thêm thành viên</span>
                            </div>
                        </div>
                    </GroupInfoStyled>
                    <SeparatedStyled></SeparatedStyled>
                    <MemberInfoStyled>
                        <h6>Thành viên nhóm</h6>
                        <div className='member-info-item' onClick={() => setToggleConversationInfo({toggle: true, level: 1})}>
                            <LuUsers className='member-info-icon'/>
                            <span>{conversationSelected?.participantIds.length} thành viên</span>
                        </div>
                    </MemberInfoStyled>
                    <SeparatedStyled></SeparatedStyled>
                    <SecuritySettingStyled>
                        <h6>Thiết lập bảo mật</h6>
                        <div className='security-setting-item'>
                            <FiTrash className='security-setting-icon'/>
                            <span>Xóa lịch sử trò chuyện</span>
                        </div>
                        <div className='security-setting-item'>
                            <RxExit className='security-setting-icon'/>
                            <span>Rời nhóm</span>
                        </div>
                    </SecuritySettingStyled>
                    <SeparatedStyled></SeparatedStyled>
                    <ManageGroupStyled>
                        <h6>Quản lý nhóm</h6>
                        <div className='manage-group-item'>
                            <IoKeyOutline className='manage-group-icon'/>
                            <span>Chuyển quyền trưởng nhóm</span>
                        </div>
                    </ManageGroupStyled>
                    <SeparatedStyled></SeparatedStyled>
                    <DeleteGroupStyled>
                        <div className='delete-group-item'>
                            <span>Giải tán nhóm</span>
                        </div>
                    </DeleteGroupStyled>
                </>
            )
		},
		{
			key: 'members-info',
			title: 'Thành viên',
            body: (
                <>
                    <div style={{height: "5rem", background: "yellow"}}>Thành viên</div>
                </>
            )
		}
        ,
		{
			key: 'conversation-info',
			title: 'Thông tin hội thoại',
            body: (
                <>
                    <div style={{height: "5rem", background: "green"}}>Thông tin hội thoại</div>
                </>
            )
		}
	];

    return (
        <>
            {toggleConversationInfo?.toggle && (
                <WrapperStyled>
                    <ConversationInfoHeaderStyled>
                        {toggleConversationInfo?.level === 1 && (
                            <MdArrowBackIos className='back-conversation-info-icon' onClick={() => setToggleConversationInfo({toggle: true, level: conversationSelected.participantIds.length > 2 ? 0 : 2})}/>
                        )}
                        <h5 className='conversation-info-title'>{items[toggleConversationInfo?.level].title}</h5>
                    </ConversationInfoHeaderStyled>
                    <ConversationInfoBodyStyled>
                        {items[toggleConversationInfo?.level].body}
                    </ConversationInfoBodyStyled>
                </WrapperStyled>
            )}
        </>
    )
}

export default ConversationInfo