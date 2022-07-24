import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import ChatWindow from "./ChatWindow";
import RecentChat from "./RecentChat";
import SettingsBar from "./SettingsBar";

interface webViewProps {
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

const WebView: React.FC<webViewProps> = ({
  addingNewUser,
  currentUser,
  messages,
  username,
  selected,
  sendMessageFunc,
  allUsers,
  toChangeCurrentUser,
  toRemoveUser
}) => {
  return (
    <React.Fragment>
      <SettingsBar />
      <RecentChat
        onAddingNewUser={addingNewUser}
        toChangeCurrentUser={toChangeCurrentUser}
        allUsers={allUsers}
        toRemoveUser={toRemoveUser}
      />
      <ChatWindow
        currentUser={currentUser}
        messages={messages}
        username={username}
        selected={selected}
        toSendMessage={sendMessageFunc}
        
      />
    </React.Fragment>
  );
};

export default WebView;
