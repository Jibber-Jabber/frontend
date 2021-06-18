import React, { useEffect, useRef, useState } from "react";
import SockJsClient from "react-stomp";
import { TalkBox } from "react-talk";
import { useSelector } from "react-redux";
import { sessionSelector } from "../../session/sessionSlice";
import { useMutation } from "react-query";
import * as http from "../../utils/http";
import CloseIcon from "@material-ui/icons/Close";
import "./ChatMessageBox.scss";

const ChatMessageBox = ({
  selectedChatUser,
  updateMyChats,
  setSelectedChatUser,
  getMyChats,
}) => {
  const [clientConnected, setClientConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  let clientRef = useRef(undefined);
  const { userInfo } = useSelector(sessionSelector);

  const readChatMessageMutation = useMutation((messageId) =>
    http.put(`readMessage/${messageId}`)
  );

  const getChatMessagesMutation = useMutation((chatInfo) =>
    http.get(`messages/${chatInfo.senderId}/${chatInfo.recipientId}`)
  );

  useEffect(() => {
    setMessages([]);
    getChatMessages();
  }, [selectedChatUser]);

  const parseMessage = (message) => {
    return {
      author: message.senderName,
      authorId: message.senderId,
      message: message.content,
    };
  };

  const readChatMessage = (msg) => {
    readChatMessageMutation.mutate(msg.id);
  };

  const getChatMessages = () => {
    const chatInfo = {
      senderId: userInfo.userId,
      recipientId: selectedChatUser?.userId,
    };
    getChatMessagesMutation.mutate(chatInfo, {
      onSuccess: (data) => {
        const messageList = data.map((message) => parseMessage(message));
        setMessages(messageList);
        getMyChats();
      },
    });
  };

  const sendMessage = (msg, selfMsg) => {
    try {
      const messageToSend = {
        senderId: userInfo.userId,
        recipientId: selectedChatUser?.userId,
        senderName: userInfo.username,
        recipientName: selectedChatUser?.userName,
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
      getMyChats();
      return true;
    } catch (e) {
      return false;
    }
  };

  const onMessageReceive = (msg, topic) => {
    updateMyChats(msg);
    if (selectedChatUser?.userId === msg.senderId) {
      readChatMessage(msg);
      const receivedMessage = parseMessage(msg);
      setMessages([...messages, receivedMessage]);
      updateMyChats({ ...msg, unreadCount: msg.unreadCount - 1 });
    }
  };

  const wsSourceUrl =
    window.location.protocol + "//" + window.location.host + "/ws";

  return (
    <div>
      {selectedChatUser && (
        <div className={"chat-box-container"}>
          <CloseIcon
            className={"chat-close-icon"}
            onClick={() => setSelectedChatUser(undefined)}
          />
          <span
            className={"chat-title"}
          >{`Private Chat with @${selectedChatUser.userName}`}</span>
          <TalkBox
            topic={""}
            currentUserId={userInfo.userId}
            currentUser={userInfo.username}
            messages={messages}
            onSendMessage={sendMessage}
            connected={clientConnected}
          />
        </div>
      )}
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
