import { useContext, useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useAuth } from '../context/AuthToken';
import { CallContext } from '../context/CallProvider';

const useListenCall = () => {
	const { socket } = useSocketContext();
    const { isShowComingCallModal, setIsShowComingCallModal, callSender, setCallSender, callURL, setCallURL } = useContext(CallContext);

	useEffect(() => {
		socket?.on('makeACallOne', (data) => {
            setCallSender({avatar: data?.senderInfo?.profilePic, name: data?.senderInfo?.fullName })
            setCallURL(data?.callUrl)
            setIsShowComingCallModal(true)
		});
		socket?.on('makeACallGroup', (data) => {
            setCallSender({avatar: data?.conversationInfo?.avatar, name: data?.conversationInfo?.name })
            setCallURL(data?.callUrl)
            setIsShowComingCallModal(true)
		});

		return () => {
			socket?.off('makeACallOne');
			socket?.off('makeACallGroup');
		}
	}, [socket]);
};

export default useListenCall;