import React, { createContext, useContext, useState } from 'react';

export let CallContext = createContext();

export const useCall = () => {
	return useContext(CallContext);
};

const CallProvider = ({ children }) => {
	const [isShowComingCallModal, setIsShowComingCallModal] = useState(false);
	const [callSender, setCallSender] = useState(null)
	const [callURL, setCallURL] = useState("")

	return (
		<CallContext.Provider
			value={{ isShowComingCallModal, setIsShowComingCallModal, callSender, setCallSender, callURL, setCallURL }}
		>
			{children}
		</CallContext.Provider>
	);
};

export default CallProvider;
