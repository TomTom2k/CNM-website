import React from "react";
// import {useParams, useLocation} from 'react-router-dom'
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const VoiceCallPage = () => {
    // const {callId} = useParams();

    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const senderId = searchParams.get('senderId');
    // const recipientId = searchParams.get('recipientId');
    // console.log(senderId, recipientId);

    // const myMeeting = async (element) => {
    //     const appID =900636412;
    //     const serverSecret = "33b9bb0370e754bd57a955b9a27c8580";
    //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, callId, Date.now().toString(), senderId);
    //     const zc = ZegoUIKitPrebuilt.create(kitToken);
    //     zc.joinRoom({
    //         container: element,
    //         scenario:{
    //             mode: ZegoUIKitPrebuilt.OneONoneCall
    //         },
    //         maxUsers: 2,
    //         showPreJoinView: false,
    //         turnOnCameraWhenJoining: false
    //     });
    // }


    // return <div>
    //     <div id="meeting" style={{width: "100%", height: "100vh"}} ref={myMeeting}></div>
    // </div>

    return <div>Hello</div>
}

export default VoiceCallPage;