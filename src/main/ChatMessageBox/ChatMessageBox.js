import React, { useRef, useState } from "react";
import SockJsClient from "react-stomp";
import { TalkBox } from "react-talk";
import { useSelector } from "react-redux";
import { sessionSelector } from "../../session/sessionSlice";
import { useMutation } from "react-query";
import axios from "axios";

const ChatMessageBox = ({ selectedChatUser }) => {
  const [clientConnected, setClientConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  let clientRef = useRef(undefined);
  const { userInfo } = useSelector(sessionSelector);

  const getChatMessage = useMutation((userId) =>
    axios.get(`/api/messages/${userId}`)
  );

  const sendMessage = (msg, selfMsg) => {
    try {
      const messageToSend = {
        senderId: userInfo.userId,
        recipientId: selectedChatUser.userId,
        senderName: userInfo.username,
        recipientName: selectedChatUser.username,
        content: selfMsg.message,
        timestamp: new Date(),
      };
      clientRef.sendMessage("/app/chat", JSON.stringify(messageToSend));

      const messageSend = {
        author: userInfo.username,
        authorId: userInfo.userId,
        message: selfMsg.message,
      };
      setMessages([...messages, messageSend]);
      return true;
    } catch (e) {
      return false;
    }
  };

  const onMessageReceive = (msg, topic) => {
    if (selectedChatUser?.userId === msg.senderId) {
      getChatMessage.mutate(msg.id, {
        onSuccess: (res) => {
          const data = res.data;
          console.log(data);
          const receivedMessage = {
            author: data.senderName,
            authorId: data.senderId,
            message: data.content,
          };
          console.log(receivedMessage);
          setMessages([...messages, receivedMessage]);
        },
      });
    }
  };

  const wsSourceUrl =
    window.location.protocol + "//" + window.location.host + "/ws";

  return (
    <div>
      <TalkBox
        topic={
          selectedChatUser
            ? `Private Chat with ${selectedChatUser?.username}`
            : "Private Chat"
        }
        currentUserId={userInfo.username}
        currentUser={userInfo.username}
        messages={messages}
        onSendMessage={sendMessage}
        connected={clientConnected}
      />
      <SockJsClient
        url={wsSourceUrl}
        topics={[`/user/${userInfo.userId}/queue/messages`]}
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
