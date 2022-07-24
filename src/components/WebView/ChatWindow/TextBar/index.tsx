import React, { MutableRefObject, RefObject, useRef } from "react";
import {
  Box,
  Button,
  calc,
  ChakraComponent,
  InputRightAddon,
} from "@chakra-ui/react";
import styles from "./index.module.css";
import { MdSend } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPaperPlane,
  faLocationDot,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import {
  Input,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { ButtonGroup } from "react-bootstrap";

interface textBarProps {
  onSend: (name: string) => void;
}

const TextBar: React.FC<textBarProps> = (props) => {
  // Toggle Settings
  const inputColorToggle = useColorModeValue(styles.lightInput,styles.darkInput)
  const attachmentColorToggle = useColorModeValue(styles.lightAttach,styles.darkAttach)
  // ---------------

  const input: MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement | null>(null);

  const sendMessage: React.MouseEventHandler = (
    event: React.MouseEvent
  ): void => {
    event.preventDefault();
    const message: string | undefined = input.current?.value;
    if (input.current?.value.trim().length === 0) {
      toast.error("Please enter a valid message");
    } else if (message!.length > 0) {
      props?.onSend && props.onSend(input.current!.value);
    }
    input.current!.value = "";
  };

  const sendMessageIfEnter: React.KeyboardEventHandler = (
    event: React.KeyboardEvent
  ) => {
    if (+event.key === 13 && input.current!.value.length > 0) {
      document.getElementById("send__message")?.click();
    }
  };

  return (
    <>
      <ToastContainer />
      <Box className={styles.container}>
        <form className={styles.sendMessage_form}>
          <button className={`${styles.add_button} ${attachmentColorToggle}`}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <input
            type="text"
            className={`${styles.input_box} ${inputColorToggle}`}
            placeholder="Type your message"
            ref={input}
            onKeyDown={sendMessageIfEnter}
          />
          <button
            className={styles.submit_button}
            onClick={sendMessage}
            id="send_message"
            type="submit"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          {/* <Button
            bgColor={bg}
            color={faIcon}
            boxShadow="0px 0px 2px 0px #0000005e"
            border="none"
            onClick={sendMessage}
            type="submit"
            id="send__message"
            fontSize="10px"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button> */}
        </form>
      </Box>
    </>
  );
};

export default TextBar;
