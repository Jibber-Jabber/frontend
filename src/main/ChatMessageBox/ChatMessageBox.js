import React, { useRef, useState } from "react";
import SockJsClient from "react-stomp";
import { TalkBox } from "react-talk";

const ChatMessageBox = () => {
  const [clientConnected, setClientConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  let clientRef = useRef(undefined);

  const sendMessage = (msg, selfMsg) => {
    try {
      clientRef.sendMessage("/app/all", JSON.stringify(selfMsg));
      console.log(selfMsg)
      return true;
    } catch (e) {
      return false;
    }
  };

  const onMessageReceive = (msg, topic) => {
    setMessages([...messages, msg]);
  };

    const wsSourceUrl = window.location.protocol + "//" + window.location.host + "/chat";

    return (
    <div>
      <TalkBox
        topic="react-websocket-template"
        currentUserId={"1234"}
        currentUser={"Pruebaaa"}
        messages={messages}
        onSendMessage={sendMessage}
        connected={clientConnected}
      />
      <SockJsClient
        url={wsSourceUrl}
        topics={["/topic/all"]}
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
