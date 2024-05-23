/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { IoCloseOutline } from "react-icons/io5";
import { MdCallEnd, MdCall } from "react-icons/md";
import { CallContext } from '../../context/CallProvider';

const ModalStyled = styled.div`
	position: fixed;
	width: 20rem;
	height: 13rem;
	background-color: var(--color-30);
	bottom: 0.5rem;
	right: 0.5rem;

	.close-btn{
		display: inline-flex;
		height: 1.6rem;
		width: 1.6rem;
		float: right;
		justify-content: center;
		align-items: center;
		color: white;
		cursor: pointer;
	}

	.conversation-info{
		display: flex;
		margin-top: 2rem; 
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.conversation-avatar {
			width: 2.8rem;
			height: 2.8rem;

			img{
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 50%;
			}
		}

		.conversation-name{
			margin-top: 0.4rem;
			color: white;
			font-size: 0.9rem;
			font-weight: 600;
		}
	}

	.call-label{
		color: white;
		font-size: 0.7rem;
		text-align: center;
		margin-top: 0.3rem;
	}

	.call-action {
		margin: 1.6rem 4rem 0;
		display: flex;
		justify-content: space-evenly;
		align-items: center;

		.call-end-btn, .call-btn {
			display: flex;
			border-radius: 50%;
			width: 2rem;
			height: 2rem;
			justify-content: center;
			align-items: center;
			color: white;
			cursor: pointer;
			animation: shake 0.5s infinite, flash 1s infinite alternate;
		}

		.call-end-btn {
			background-color: rgba(255, 66, 71, 1);
		}

		.call-btn {
			background-color: #41b841;
		}

		@keyframes shake {
			0%, 100% { transform: translateX(0); }
			25% { transform: translateX(-2px); }
			50% { transform: translateX(2px); }
			75% { transform: translateX(-2px); }
		}
	
		@keyframes flash {
			0% { opacity: 1; }
			100% { opacity: 0.5; }
		}
	}
`;

const IncomingCallModal = () => {
	const { isShowComingCallModal, setIsShowComingCallModal, callSender, setCallSender, callURL, setCallURL } = useContext(CallContext);

	const handleAcceptCall = () => {
		setIsShowComingCallModal(false)
		window.open(callURL, '_blank');
	}

	const handleRefuseCall = () => {
		setIsShowComingCallModal(false)
	}

	return (
		isShowComingCallModal && <ModalStyled>
			<div className='close-btn' onClick={() => setIsShowComingCallModal(false)}>
				<IoCloseOutline size={20}/>
			</div>
			<div className='conversation-info'>
				<div className='conversation-avatar'>
					<img src={callSender?.avatar} alt=''/>
				</div>
				<div className='conversation-name'>{callSender?.name}</div>
			</div>
			<div className='call-label'>Zalo: Cuộc gọi thoại đến</div>
			<div className='call-action'>
				<div className='call-end-btn' onClick={() => handleRefuseCall()}>
					<MdCallEnd />
				</div>
				<div className='call-btn' onClick={() => handleAcceptCall()}>
					<MdCall />
				</div>
			</div>
		</ModalStyled>
	);
};

export default IncomingCallModal;
