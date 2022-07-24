import React from "react";
import MessageWindow from "../../MessageWindow";
import TextBar from "../../TextBar";
import styles from "./index.module.css";
import { Flex, Box, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ColorModeSwitcher from "../../ColorModeSwitcher";
import { useColorModeValue } from '@chakra-ui/react';


interface chatWindowProps {
  messages: any[];
  username: string;
  selected: (option: { key: string; text: string; backmenu: boolean }) => void;
  toSendMessage: (text: string) => void;
  toShowChats: (event: React.MouseEvent) => void;
  currentUser: {name: string, number: string | null}
}

const ChatWindow: React.FC<chatWindowProps> = ({
  messages,
  username,
  selected,
  toSendMessage,
  toShowChats,
  currentUser
}) => {

  const backgroundColorToggle = useColorModeValue(styles.lightContainer,styles.darkContainer)
  const backBoxToggle = useColorModeValue(styles.lightBackBox,styles.darkBackBox)
  const headingColorToggle = useColorModeValue(styles.lightUsername,styles.darkUsername)

  return (
    <Flex bgColor="#282A37" flexDirection="column" height="100vh" width="100%">
      {/* Top Section */}
      <Box className={`${styles.top_section} ${backgroundColorToggle}`}>
        {/* For the back button */}
        <Box flex="1" className={headingColorToggle}>
          <Button
            onClick={toShowChats}
            ml="0.5rem"
            size="xs"
            variant="ghost"
            fontSize="sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </Box>

        {/* Name and Icon */}
        <Flex flex="9" justifyContent='space-between'>
          <Flex justifyContent='center' alignItems='center'> 
            <Box className={styles.avatarContainer}>
              <Box className={styles.innerRing} />
            </Box>
            <Box className={`${styles.UserName} ${headingColorToggle}`}>{currentUser.name}</Box>
          </Flex>

          <Box mr="1rem">
            <ColorModeSwitcher />
          </Box>
        </Flex>
      </Box>

      {/* Chat Window */}
      <Box className={`${styles.chatWindow} ${backgroundColorToggle}`}>
        {/* NeoMorphism Box */}
        <Box className={styles.BackBox}>
          {/* Chat Area */}
          <Box>
            <MessageWindow
              messages={messages}
              username={username}
              selected={selected}
            />
          </Box>

          {/* TextBar */}
          <TextBar onSend={toSendMessage} />
        </Box>
      </Box>
    </Flex>
  );
};

export default ChatWindow;
