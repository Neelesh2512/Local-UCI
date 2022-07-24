import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import styles from "./index.module.css";
import MessageWindow from "./MessageWindow";
import TextBar from "./TextBar";
import ColorModeSwitcher from "../../ColorModeSwitcher";
import {useColorModeValue } from "@chakra-ui/react";

interface chatWindowProps {
  messages: any[];
  username: string;
  selected: (option: { key: string; text: string; backmenu: boolean }) => void;
  toSendMessage: (text: string) => void;
  currentUser: {name: string, number: string | null}
}

const ChatWindow: React.FC<chatWindowProps> = ({
  messages,
  username,
  selected,
  toSendMessage,
  currentUser,

}) => {

  const backgroundColorToggle = useColorModeValue(styles.lightContainer,styles.darkContainer)
  const backBoxToggle = useColorModeValue(styles.lightBackBox,styles.darkBackBox)
  const headingColorToggle = useColorModeValue(styles.lightUsername,styles.darkUsername)

  

  return (
    <Flex
      className={`${styles.container}`}
    >
      {/* Top Section */}
      <Box className={`${styles.top_section} ${backgroundColorToggle}`}>
        {/* Name and Icon */}
        
          <Flex>
            <Box className={styles.avatarContainer}>
              <Box className={styles.innerRing} />
            </Box>
            <Box className={`${styles.UserName} ${headingColorToggle}`}>{currentUser.name}</Box>
          </Flex>

          <Box className={styles.toggleButtonContainer}>
            <ColorModeSwitcher />
          </Box>
  
      </Box>

      {/* Chat Window */}
      <Box className={`${styles.chatWindow} ${backgroundColorToggle}`}>
        {/* NeoMorphism Box */}
        <Box className={`${styles.BackBox} ${backBoxToggle}`}>
          {/* Chat Area */}
          <Box>
            <MessageWindow
              messages={messages}
              username={username}
              selected={selected}
            />
          </Box>

          {/* TextBar */}
          <Box className={styles.inputSection}>
            <TextBar onSend={toSendMessage} />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ChatWindow;
