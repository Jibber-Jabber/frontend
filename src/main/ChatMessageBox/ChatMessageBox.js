import React, { useRef, useState } from "react";
import SockJsClient from "react-stomp";
import { TalkBox } from "react-talk";
import { useSelector } from "react-redux";
import { sessionSelector } from "../../session/sessionSlice";

const ChatMessageBox = ({ selectedChatUser }) => {
  const [clientConnected, setClientConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  let clientRef = useRef(undefined);
  const { userInfo } = useSelector(sessionSelector);

  const sendMessage = (msg, selfMsg) => {
    try {
      const messageToSend = {
        message: selfMsg.message,
        author: userInfo.username,
        receiver: selectedChatUser
          ? selectedChatUser.username
          : userInfo.username,
      };
      clientRef.sendMessage(
        "/app/sendPrivateMessage",
        JSON.stringify(messageToSend)
      );
      console.log(selfMsg);
      return true;
    } catch (e) {
      return false;
    }
  };

  const onMessageReceive = (msg, topic) => {
    setMessages([...messages, msg]);
  };

  const wsSourceUrl =
    window.location.protocol + "//" + window.location.host + "/chat";

  return (
    <div>
      <TalkBox
        topic="react-websocket-template"
        currentUserId={userInfo.username}
        currentUser={userInfo.username}
        messages={messages}
        onSendMessage={sendMessage}
        connected={clientConnected}
      />
      <SockJsClient
        url={wsSourceUrl}
        topics={[
          `/user/${
            selectedChatUser ? selectedChatUser.username : userInfo.username
          }/reply`,
        ]}
        onMessage={onMessageReceive}
        ref={(client) => {
          clientRef = client;
        }}
        onConnect={() => setClientConnected(true)}
        onDisconnect={() => setClientConnected(false)}
        debug={false}
      />
    </div>
  );
};

export default ChatMessageBox;
