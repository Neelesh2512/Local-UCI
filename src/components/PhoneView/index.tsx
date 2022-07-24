import React from "react";
import ChatWindow from "./ChatWindow";
import { useState } from "react";
import RecentChats from "./RecentChats";

interface phoneViewProps {
  messages: any[];
  username: string;
  selected: (option: { key: string; text: string; backmenu: boolean }) => void;
  sendMessageFunc: (text: string) => void;
  allUsers: { name: string; number: string | null; active: boolean }[];
  toChangeCurrentUser: (name: string, number: string | null) => void;
  currentUser: { name: string; number: string | null };
  addingNewUser: (newName: string, newNumber: string) => void;
  toRemoveUser: (name: string, number: string | null) => void;
}

const PhoneView: React.FC<phoneViewProps> = ({
  messages,
  username,
  selected,
  sendMessageFunc,
  allUsers,
  toChangeCurrentUser,
  currentUser,
  addingNewUser,
  toRemoveUser,
}) => {
  const [toggleView, setToggleView] = useState(false);

  const showChatSection: React.MouseEventHandler = (
    event: React.MouseEvent
  ) => {
    setToggleView(true);
  };

  const showChatWindow = () => {
    setToggleView(false);
  }

  if (!toggleView) {
    return (
      <ChatWindow
        currentUser={currentUser}
        toShowChats={showChatSection}
        messages={messages}
        username={username}
        selected={selected}
        toSendMessage={sendMessageFunc}
      />
    );
  } else {
    return (
      <RecentChats
        onAddingNewUser={addingNewUser}
        toChangeCurrentUser={toChangeCurrentUser}
        allUsers={allUsers}
        toRemoveUser={toRemoveUser}
        toShowChatWindow={showChatWindow}
      />
    );
  }
};

export default PhoneView;
