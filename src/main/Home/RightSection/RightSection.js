import React, { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { Button, TextField } from "@material-ui/core";
import ChatMessageBox from "../../ChatMessageBox/ChatMessageBox";
import { useMutation } from "react-query";
import * as http from "../../../utils/http";
import { useSelector } from "react-redux";
import { sessionSelector } from "../../../session/sessionSlice";
import { useHistory } from "react-router-dom";
import "./RightSection.scss";

const RightSection = () => {
  const { userInfo } = useSelector(sessionSelector);
  const history = useHistory();

  const [usersOptions, setUsersOptions] = useState([]);
  const [selectedChatUser, setSelectedChatUser] = useState(undefined);
  const [followedList, setFollowedList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [myChatsList, setMyChatsList] = useState([]);

  useEffect(() => {
    getFollowedList();
    getMyChats();
  }, []);

  const searchUserMutation = useMutation((username) => {
    return http.get(`users/searchUser?username=${username}`);
  });

  const followUserMutation = useMutation((userId) => {
    return http.post(`users/followUser?userId=${userId}`);
  });

  const unfollowUserMutation = useMutation((userId) => {
    return http.post(`users/unfollowUser?userId=${userId}`);
  });
  const getFollowedListMutation = useMutation(() => {
    return http.get(`users/followedUsers`);
  });

  const getMyChatsMutation = useMutation((senderId) =>
    http.get(`chats/${senderId}`)
  );

  const getFollowedList = () => {
    getFollowedListMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          setFollowedList(data);
        },
      }
    );
  };

  const handleAutocompleteChange = (e) => {
    const { value } = e.target;

    if (value === "") {
      setUsersOptions([]);
      return;
    }

    searchUserMutation.mutate(value, {
      onSuccess: (data) => {
        setUsersOptions(data);
      },
    });
  };

  const handleFollowUser = () => {
    followUserMutation.mutate(selectedUser?.userId, {
      onSuccess: () => {
        getFollowedList();
      },
    });
  };

  const handleUnFollowUser = (userId) => {
    unfollowUserMutation.mutate(userId, {
      onSuccess: () => {
        getFollowedList();
      },
    });
  };

  const handleViewUserProfile = (userId) => {
    history.push(`/profile/${userId}`);
  };

  const getMyChats = () => {
    getMyChatsMutation.mutate(userInfo.userId, {
      onSuccess: (data) => setMyChatsList(data),
    });
  };

  const updateMyChats = (msg) => {
    const updatedChatsList = myChatsList.map((chatInfo) => {
      return msg.chatId === chatInfo.chatId
        ? { ...chatInfo, unreadCount: msg.unreadCount }
        : chatInfo;
    });
    setMyChatsList(updatedChatsList);
  };

  return (
    <div className={"right-section-container"}>
      <Autocomplete
        id="combo-box"
        options={usersOptions}
        getOptionLabel={(option) => option.username}
        style={{ width: 300 }}
        onChange={(event, selectedValue) => setSelectedUser(selectedValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            className={"text-field"}
            label="Search User"
            variant="outlined"
            onChange={handleAutocompleteChange}
          />
        )}
      />
      {selectedUser && (
        <div className={"selected-user-to-follow"}>
          <div>
            {"User: "}
            <a
              className={"user-selected"}
              onClick={() => handleViewUserProfile(selectedUser?.userId)}
            >
              {selectedUser?.username}
            </a>
          </div>
          {!followedList.find(
            (user) => user.userId === selectedUser?.userId
          ) ? (
            <Button
              className={"follow-btn"}
              variant="contained"
              color="primary"
              onClick={handleFollowUser}
            >
              Follow
            </Button>
          ) : (
            <Button
              className={"follow-btn"}
              variant="contained"
              color="primary"
              onClick={() => handleUnFollowUser(selectedUser?.userId)}
            >
              UnFollow
            </Button>
          )}
          <Button
            className={"show-chat-btn"}
            variant="contained"
            color="primary"
            onClick={() =>
              setSelectedChatUser({
                userId: selectedUser.userId,
                userName: selectedUser.username,
              })
            }
          >
            Chat
          </Button>
        </div>
      )}
      <div className={"followed-list"}>
        <span>Followed List:</span>
        {followedList?.map((userFollowed) => (
          <div className={"followed-user-item"}>
            <div>
              {"User: "}
              <a
                className={"user-selected"}
                onClick={() => handleViewUserProfile(userFollowed?.userId)}
              >
                {userFollowed?.username}
              </a>
            </div>
            <Button
              className={"follow-btn"}
              variant="contained"
              color="primary"
              onClick={() => handleUnFollowUser(userFollowed?.userId)}
            >
              UnFollow
            </Button>
          </div>
        ))}
      </div>
      <div className={"my-chats-list"}>
        <span>Active Chats:</span>
        {myChatsList.map((chatInfo) => (
          <div className={"chat-list-item"}>
            <span className={"chat-list-username"}>{chatInfo.userName}</span>
            <Button
              className={"show-chat-btn"}
              variant="contained"
              color="primary"
              onClick={() => setSelectedChatUser(chatInfo)}
            >
              Chat
            </Button>
            {chatInfo.unreadCount > 0 && (
              <span className={"unread-count"}>{chatInfo.unreadCount}</span>
            )}
          </div>
        ))}
      </div>
      <div className={"chat-box"}>
        <ChatMessageBox
          selectedChatUser={selectedChatUser}
          updateMyChats={updateMyChats}
        />
      </div>
    </div>
  );
};

export default RightSection;
