import { useRef, useEffect, MutableRefObject } from "react";
import styles from "./index.module.css";
import {
  Text,
  Box,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface messageProps {
  text: any;
  username: string;
  self: boolean;
  choices: any;
  data: any;
  location: any;
  image: any;
  caption: string;
  audio: any;
  video: any;
  doc: any;
}

const Message: React.FC<messageProps> = ({
  text,
  username,
  self,
  choices,
  data,
  location,
  image,
  caption,
  audio,
  video,
  doc,
}: {
  text: any;
  username: string;
  self: boolean;
  choices: any;
  data: any;
  location: any;
  image: any;
  caption: string;
  audio: any;
  video: any;
  doc: any;
}) => {
  // Theme toggle Settings
  const box_color = useColorModeValue("#FFFFFF", "#424656");
  const text_color = useColorModeValue("#000", "#fff");
  // ------------
  return (
    <Flex>
      {self === true && (
        <>
          <Spacer />
          <Box
            borderColor="white"
            color={text_color}
            bgColor="#1D90F5"
            className="chat-message chat-reciever"
          >
            <Box className={styles.message_username}>
              <Text fontSize="md" fontWeight="bold">
                {username}
              </Text>
            </Box>
            {!image && !audio && !video && !doc && !location && (
              <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
            )}
            {location && (
              <div style={{ whiteSpace: "pre-wrap" }}>
                <a
                  href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}+&output=embed`}
                  target="blank"
                  style={{ color: "White" }}
                >
                  <iframe
                    src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}+&output=embed`}
                  />
                </a>
              </div>
            )}
            {image && (
              <div style={{ whiteSpace: "pre-wrap" }}>
                <img src={image} style={{ maxWidth: "300px" }} />
              </div>
            )}
            {audio && (
              <audio controls>
                <source src={audio} />
                Your browser does not support the audio element.
              </audio>
            )}
            {video && (
              <video width="320" height="240" controls>
                <source src={video} />
                Your browser does not support the video tag.
              </video>
            )}
            {doc && (
              <Button colorScheme="blackAlpha" padding="10px" marginTop="10px">
                <Link href={doc} isExternal>
                  Click to open this file <ExternalLinkIcon mx="2px" />
                </Link>
              </Button>
            )}
          </Box>
        </>
      )}
      {!self === true && (
        <>
          <div>
            <Box
              bgColor={text === "Invalid Input!!! Please try again."
              ? "#FF5C5C"
              : box_color}
              color={text_color}
              borderColor="white"
              className={
                text === "Invalid Input!!! Please try again."
                  ? "chat-error-message"
                  : "chat-message"
              }
            >
              <Box className={styles.message_username}>
                <Text fontSize="md" fontWeight="bold">
                  {username}
                </Text>
              </Box>
              {!image && !audio && !video && !doc && !location && (
                <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
              )}
              {image && (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  <img src={image} style={{ maxWidth: "300px" }} />
                </div>
              )}
              {audio && (
                <audio controls>
                  <source src={audio} />
                  Your browser does not support the audio element.
                </audio>
              )}
              {location && (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  <a
                    href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}+&output=embed`}
                    target="blank"
                    style={{ color: "White" }}
                  >
                    <iframe
                      src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}+&output=embed`}
                    />
                  </a>
                </div>
              )}
              {video && (
                <video width="320" height="240" controls>
                  <source src={video} />
                  Your browser does not support the video tag.
                </video>
              )}
              {doc && (
                <Button
                  colorScheme="blackAlpha"
                  padding="10px"
                  marginTop="10px"
                >
                  <Link href={doc} isExternal>
                    Click to open this file <ExternalLinkIcon mx="2px" />
                  </Link>
                </Button>
              )}
              <div style={{ whiteSpace: "pre-wrap" }}>{caption}</div>
            </Box>
            {choices && choices.length > 0 && (
              <Box className="chat-choices-container">
                {choices.map((choice: any) => (
                  <Button
                    borderColor="white"
                    backgroundColor={box_color}
                    className="chat-choices"
                    key={choice.key}
                    onClick={() => data(choice)}
                  >
                    {choice.key} {choice.text}
                  </Button>
                ))}
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
  selected: (option: any) => void;
  messages: messageProps[];
  username: string;
}

const MessageWindow: React.FC<messageWindowProps> = (props) => {
  let messageWindow: MutableRefObject<any> = useRef(null);

  // { current: null }
  useEffect(() => {
    // messageWindow = messageWindow.current;
    messageWindow.current.scrollTop =
      messageWindow.current.scrollHeight - messageWindow.current.clientHeight;
  }, [messageWindow]);

  const username: string = props.username;
  const messages: any = props.messages || [];
  console.log({ username, messages });
  return (
    <Box mt={20} ref={messageWindow}>
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
              location={msg.location}
              image={msg.image}
              caption={msg.caption}
              audio={msg.audio}
              video={msg.video}
              doc={msg.doc}
            />
          );
        })}
      <div>&nbsp;</div>
    </Box>
  );
};

export default MessageWindow;
