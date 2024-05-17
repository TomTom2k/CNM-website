import { useContext, useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useAuth } from '../context/AuthToken';

const useListenFriend = () => {
	const { socket } = useSocketContext();
	const { user, setUser } = useAuth();

	useEffect(() => {
		socket?.on('deleteFriend', (deletedUser) => {
            setUser(prevUser => ({
				...prevUser,
				friends: prevUser.friends.filter(friend => friend !== deletedUser)
			}));
		});

		return () => {
			socket?.off('deleteFriend');
		}
	}, [setUser, socket]);
};

export default useListenFriend;
