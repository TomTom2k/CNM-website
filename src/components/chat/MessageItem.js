import styled from 'styled-components';
import { FaEllipsisH } from 'react-icons/fa';
import { IoMdShareAlt } from "react-icons/io";
import Tippy from '@tippyjs/react/headless';
import { SlReload } from "react-icons/sl";
import { FiTrash } from "react-icons/fi";
import { MdOutlineContentCopy } from "react-icons/md";
import { PiShareFatLight } from "react-icons/pi";
import { copyImageToClipboard } from 'copy-image-clipboard'

import FileItem from "./FileItem";
import messageApi from '../../api/messageApi';

const MessageItemStyled = styled.div`
    min-width: 6%;
    max-width: 50%;
    margin: 0.6rem;
    border-radius: 0.6rem;
    background-color: var(--white-message);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    color: var(--text-primary);
    position: relative; 

    &:has(.file-item) {
		width: 40%;
	}

    .action-wrapper {
        &.for-owner {
            display: none;
        }

        &.for-file {
            display: none;
        }

        &.for-image{
            display: none;
        }

        display: inline-flex;
    }

    &::after{
        content: "";
        position: absolute;
        right: -500px;
        top: 0;
        width: 500px;
        height: 100%;
        background-color: transparent;
    }

    &.short-time-message {
        margin: 0.6rem 0.6rem -0.3rem;
    }

    .message-action {
        display: none;
        right: -80px;
        bottom: 10px;
        position: absolute;
        width: 64px;
        border-radius: 0.4rem;
        background-color: hsla(0, 0%, 100%, 0.5);
        color: #7589a3;
        z-index: 1;
    }

    &:hover {
        .message-action {
          display: block;
          padding-left: 48px;
        }  
    }

    .share-icon{
        margin-left: -38px;
        margin-right: 10px;
        cursor: pointer;

        &:hover {
            color: #005ae0;
        }
    }

    .more-action-icon {
        cursor: pointer;
        &:hover {
            color: #005ae0;;
        }
    }

    &.self {
        background-color: var(--blue-message);
        align-self: flex-end;

        .message-action {
            left: -80px;
        }

        &::after{
            left: -500px;
        }

        .action-wrapper {
            &.for-owner{
                display: inline-flex;
            }
        }
    }

    &.no-background-color{
        background-color: transparent;
        border: none;
        box-shadow: none;

        .message-time {
            font-size: 0.8rem;
            padding: 0.2rem 0.5rem;
            margin-top: 0.2rem;
            display: inline-block;
            background-color: rgba(0, 0, 0, 0.2);
            color: white;
            border-radius: 1rem;
        }

        &.self {
            .message-time {
                float: right;
            }
        }

        .message-action {
            bottom: 40px;
        }
    }
    
    .text-message-item {
        margin: 0;
        padding: 1rem 1rem;
        border-radius: 1rem;
        word-wrap: break-word;

        &.recalled-message-item{
            color: rgba(0, 0, 0, 0.3);
            -webkit-user-select: none; /* Safari */
            -ms-user-select: none; /* IE 10 and IE 11 */
            user-select: none; /* Standard syntax */
        }
    }

    .like-message-item {
        margin: 0;
        padding: 0.8rem 0.6rem;
        border-radius: 1rem;
        
        img {
            width: 2.6rem;
            height: 2.6rem;
        }
    }

    .file-item {
        cursor: pointer;
        padding: 1rem 1rem;
        border-radius: 1rem;

        ~ div {
            .action-wrapper {
                &.not-for-file{
                    display: none;
                }

                &.for-file{
                    display: inline-flex;
                }
            }
        }
    }

    .image-block {
        ~ div {
            .action-wrapper {
                &.not-for-image{
                    display: none;
                }

                &.for-image{
                    display: inline-flex;
                }
            }
        }
    }

    .image-block:has(> .block) {
        ~ div {
            .action-wrapper {
                &.not-for-image-block{
                    display: none;
                }
            }
        }
    }

    .message-time {
        font-size: 0.8rem;
        padding: 0 1rem 0.6rem;
        display: block;
        margin-top: -0.4rem;
        color: #476285;
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }
`;

const ImageBlock = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 100%;

	img {
		max-width: 100%;
		cursor: pointer;
		border-radius: 0.6rem;
		border: 2px solid transparent;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

		&.block {
			width: 50%;
		}
		flex: 1;
	}
`;

const PopperWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 80px;
    border-radius: 6px;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 12%) 0px 2px 12px;
    overflow: hidden;

    .action-wrapper {
        align-items: center;
        min-width: 180px;
        padding: 8px 16px;
        font-size: 0.9rem;
        cursor: pointer;
        border: 1px solid transparent;
        user-select: none;
        width: 100%;
        justify-content: flex-start;
        line-height: 1.8rem;

        .icon {
            display: inline-block;
            width: 24px;
            text-align: center;
            margin-right: 8px;
        }

        &.separate {
            border-bottom: 1px solid rgba(22, 24, 35, 0.12);
        }
    
        &:hover {
            background-color: rgba(22, 24, 35, 0.03);
        }

        &.dangerous {
            color: #d91b1b;
        }
    }
`;

const MessageItem = ({user, message, index, arr, elementShowTippy, setElementShowTippy, hideEmojiPicker, setMessages, messages}) => {
    const MENU_ITEMS = [
        {
            icon: <MdOutlineContentCopy />,
            title: 'Copy tin nhắn',
            separate: true,
            notForFile: true,
            notForImage: true,
            handleClick: () => handleCopyText()
        },
        {
            icon: <MdOutlineContentCopy />,
            title: 'Copy hình ảnh',
            separate: true,
            forImage: true,
            notForImageBlock: true,
            handleClick: () => handleCopyImage()
        },
        {
            icon: <PiShareFatLight />,
            title: 'Chia sẻ',
            separate: true,
            forFile: true,
            handleClick: () => alert('a')
        },
        {
            icon: <SlReload />,
            title: 'Thu hồi',
            dangerous: true,
            forOwner: true,
            handleClick: () => handleRecall()
        },
        {
            icon: <FiTrash />,
            title: 'Xóa chỉ ở phía tôi',
            dangerous: true ,
            handleClick: () => handleDeleteForMeOnly()
        },
    ];

    const handleClickMoreAction = (e) => {
        e.stopPropagation();
        setElementShowTippy(message.messageId)
        if(hideEmojiPicker){
            hideEmojiPicker()
        }
    }

    const renderItems = () => {
        return MENU_ITEMS.map((item, index) => (
            <div  
                key={index} 
                className={`
                    action-wrapper 
                    ${item.separate ? 'separate' : ''} 
                    ${item.dangerous ? 'dangerous' : ''} 
                    ${item.forOwner ? 'for-owner' : ''} 
                    ${item.notForFile ? 'not-for-file' : ''} 
                    ${item.forFile ? 'for-file' : ''} 
                    ${item.notForImage ? 'not-for-image' : ''} 
                    ${item.forImage ? 'for-image' : ''}
                    ${item.notForImageBlock ? 'not-for-image-block' : ''} 
                `} 
                onClick={item.handleClick}
            >
                <span className='icon'>{item.icon}</span>
                <span className='title'>{item.title}</span>
            </div>
        ))
    }
    
    const renderMessageActions = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    {renderItems()}
                </PopperWrapper>
            </div>
        );
    };

    const handleCopyText = () => {
        navigator.clipboard.writeText(message.content)
    }

    const handleCopyImage = () => {
        copyImageToClipboard(message.content)
        .then(() => {
            console.log('Image Copied')
        })
        .catch((e) => {
            console.log('Error: ', e.message)
        })
    }

    const handleRecall = async () => {
        try {
            await messageApi.recallMessage(message.messageId);
            const updatedMessages = messages.map(messageItem => {
				if (messageItem.messageId === message.messageId) {
					messageItem.isRecalled = true;
				}
				return messageItem;
			});
            setMessages(updatedMessages)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteForMeOnly = async () => {
        try {
            await messageApi.deleteMessageForMeOnly(message.messageId);
            const updatedMessages = messages.map(messageItem => {
				if (messageItem.messageId === message.messageId) {
					messageItem.deletedUserIds.push(user.userID)
				}
				return messageItem;
			});
            setMessages(updatedMessages)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {!message.deletedUserIds?.includes(user.userID) ? (
                <>
                    {message.isRecalled ? (
                        <MessageItemStyled 
                            className={`
                                ${user.userID === message?.senderId ? 'self' : ''} 
                                ${
                                    arr[index+1] 
                                    && arr[index+1].senderId === message.senderId 
                                    && new Date(arr[index+1].createdAt).getTime() - new Date(message.createdAt).getTime() <= 300000
                                    ? 'short-time-message' : ''
                                }
                            `}
                        >
                            <p className='text-message-item recalled-message-item'>
                                Tin nhắn đã được thu hồi
                            </p>
                            {
                                arr[index+1] 
                                && arr[index+1].senderId === message.senderId 
                                && new Date(arr[index+1].createdAt).getTime() - new Date(message.createdAt).getTime() <= 1800000 
                                ? null
                                : <span className='message-time'>{`${new Date(message.createdAt).getHours().toString().padStart(2, '0')}:${new Date(message.createdAt).getMinutes().toString().padStart(2, '0')}`}</span> 
                            }
                        </MessageItemStyled>
                    ) : (
                        <MessageItemStyled 
                            className={`
                                ${user.userID === message?.senderId ? 'self' : ''} 
                                ${message.type === 'image' ? 'no-background-color' : ''}
                                ${
                                    arr[index+1] 
                                    && arr[index+1].senderId === message.senderId 
                                    && new Date(arr[index+1].createdAt).getTime() - new Date(message.createdAt).getTime() <= 300000
                                    ? 'short-time-message' : ''
                                }
                            `}
                        >
                            {(() => {
                                if (message.type === "text") {
                                    return (
                                        <p className='text-message-item'>
                                            {message.content}
                                        </p>
                                    );
                                } else if (message.type === "image") {
                                    const images = message.content.split(" ");
                                    return (
                                        <ImageBlock
                                            key={message.messageId}
                                            className='image-block'
                                        >
                                            {images.map((image, index) => {
                                                return (
                                                    <img
                                                        id={index}
                                                        className={images.length > 1 ? 'block' : ''}
                                                        key={index}
                                                        src={image}
                                                        alt={`img_${index}`}
                                                        onClick={(e) => window.open(e.target.currentSrc)}
                                                    />
                                                );
                                            })}
                                        </ImageBlock>
                                    );
                                } else if (message.type === "file") {
                                    const fileNameS3 = message.content.split("/");
                                    return (
                                        <FileItem
                                            fileName={fileNameS3[fileNameS3.length - 1].split(".").slice(2).join(".")}
                                            fileSize={fileNameS3[fileNameS3.length - 1].split(".")[1]}
                                            fileNameS3={fileNameS3[fileNameS3.length - 1]}
                                            fileURL={message.content}
                                            className='file-item'
                                            onClick={() => window.open(message.content)}
                                        />
                                    );
                                } else if (message.type === "like") {
                
                                    return (
                                        <p className='like-message-item'>
                                            <img src={message.content} alt=''/>
                                        </p>
                                    );
                                }
                            })()}
                            {/* Điều kiện hiển thị thời gian của tin nhắn
                                1. Nếu không có tin nhắn phía sau
                                2. Nếu tin nhắn phía sau là của người khác
                                3. Nếu tin nhắn phía sau cách tin nhắn hiện tại hơn 5 phút 
                            */}
                            {
                                arr[index+1] 
                                && arr[index+1].senderId === message.senderId 
                                && new Date(arr[index+1].createdAt).getTime() - new Date(message.createdAt).getTime() <= 1800000 
                                ? null
                                : <span className='message-time'>{`${new Date(message.createdAt).getHours().toString().padStart(2, '0')}:${new Date(message.createdAt).getMinutes().toString().padStart(2, '0')}`}</span> 
                            }
                            <Tippy
                                visible={elementShowTippy === message.messageId}
                                interactive
                                delay={[0, 0]}
                                offset={[0, -4]}
                                placement="top-end"
                                render={renderMessageActions}
                            >
                                <div className='message-action'>
                                    <IoMdShareAlt className='share-icon'/>
                                    <FaEllipsisH className='more-action-icon' onClick={(e) => handleClickMoreAction(e)}/>
                                </div>
                            </Tippy>
                        </MessageItemStyled>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    )
}

export default MessageItem