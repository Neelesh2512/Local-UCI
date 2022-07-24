import { useRef, useEffect, MutableRefObject } from "react";
import styles from "./index.module.css";
import {
  Text,
  Box,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

interface messageProps {
  text: any;
  username: string;
  self: boolean;
  choices: { key: string; text: string; backmenu: boolean }[];
  data: any;
}

const Message: React.FC<messageProps> = ({
  text,
  username,
  self,
  choices,
  data,
}: {
  text: any;
  username: string;
  self: boolean;
  choices: { key: string; text: string; backmenu: boolean }[];
  data: (option: { key: string; text: string; backmenu: boolean }) => void;
}) => {
  // Theme toggle Settings
  // const box_color = useColorModeValue("#06d755", "#202C33");
  const recievedMessageColor = useColorModeValue(styles.lightMessage,styles.darkMessage)
  const text_color = useColorModeValue("#000", "#fff");
  // ------------
  return (
    <Flex>
      {self === true && (
        <>
          <Spacer />
          <Box
            className={`${styles.myMessage} ${styles.message}`}
          >
            <Box style={{ whiteSpace: "pre-wrap" }}>{text}</Box>
          </Box>
        </>
      )}
      {!self === true && (
        <>
          <div>
            <Box
              color={text_color}
              className={
                text === "Invalid Input!!! Please try again."
                  ? `${styles.message} ${styles.errorMessage} ${recievedMessageColor}`
                  : `${styles.message} ${styles.recievedMessage} ${recievedMessageColor}`
              }
            >
              {/* <Box className={styles.message_username}>
                <Text fontSize="lg" fontWeight="bold">
                  {username}
                </Text>
              </Box> */}
              <Box style={{ whiteSpace: "pre-wrap" }}>
                {text}
              </Box>
            </Box>
            {choices && choices.length > 0 && (
              <Box className={styles.chatChoices_container}>
                {choices.map(
                  (choice: {
                    key: string;
                    text: string;
                    backmenu: boolean;
                  }) => (
                    <button
                      className={styles.chatChoices}
                      key={choice.key}
                      onClick={() => data(choice)}
                    >
                      {choice.key} {choice.text}
                    </button>
                  )
                )}
              </Box>
            )}
          </div>
          <Spacer />
        </>
      )}
    </Flex>
  );
};

interface messageWindowProps {
  selected: (option: { key: string; text: string; backmenu: boolean }) => void;
  messages: messageProps[];
  username: string;
}

const MessageWindow: React.FC<messageWindowProps> = (props) => {
  let messageWindow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageWindow.current !== null) {
      messageWindow.current.scrollTop =
        messageWindow.current.scrollHeight - messageWindow.current.clientHeight;
    }
  }, [messageWindow]);

  const username: string = props.username;
  const messages: any = props.messages || [];
  console.log({ username, messages });
  return (
    <Box mt={4} ref={messageWindow} className={styles.messagesContainer}>
      {messages.length > 0 &&
        messages.map((msg: any, i: number) => {
          return (
            <Message
              key={i}
              text={msg.text}
              username={msg.username}
              self={username === msg.username}
              choices={msg.choices}
              data={props.selected}
            />
          );
        })}
      <div>&nbsp;</div>
    </Box>
  );
};

export default MessageWindow;
