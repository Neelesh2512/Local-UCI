import React from "react";
import { Flex, Box, Text, useColorModeValue, Button, Menu,
  MenuButton,
  MenuList,
  MenuItem, } from "@chakra-ui/react";
import styles from "./ChatSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faUser } from "@fortawesome/free-solid-svg-icons";
import ChatItem from "./ChatItem";
import SecNavbar from "../SecNavbar";
import Submenu from "../SecNavbar/Submenu";
import { HamburgerIcon } from "@chakra-ui/icons";
import Setting from "../Settings/Setting";
import Settings from "../Settings";
interface chatSectionProps {
  toShowSettings: (event: React.MouseEvent) => void;
  toChangeCurrentUser: (name: string) => void;
  allUsers: { name: string; number: string | null, active: boolean }[];
}

const ChatSection: React.FC<chatSectionProps> = ({
  toShowSettings,
  toChangeCurrentUser,
  allUsers,
}) => {

  const bg = useColorModeValue("#DDDDDD", "#272A37");

  const changingUser = (name: string) => {
    toChangeCurrentUser(name);
  };
  return (
    <Box className={styles.main__container}>
      {/* Settings Heading */}
      <Box
        className={styles.header}
        flex="1"
        bgColor={bg}
        mb="0rem"
        width="100%"
        display="flex"
        justifyContent="space-between"
      >
        <Flex   justifyContent="center" alignItems="center" flex="1">
          <Box
            borderRadius="50%"
            height="60px"
            width="200px"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            fontSize={"35px"}
            marginLeft="1rem"
          >Chats</Box>
        </Flex>

        <Box
          fontSize="30px"
          flex="3"
          display="flex"
          justifyContent="end"
          alignItems="center"
          pr="1rem"
        >
          <Menu closeOnSelect={false}>
            <MenuButton>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={toShowSettings}>Settings</MenuItem>
              <div> <Submenu /> </div>
            </MenuList>

          </Menu>
        </Box>
      </Box>

      {/* Profile Section */}
      <Box flex="8" backgroundColor={bg}>
        {/* <ChatItem
          image="/neelesh.png"
          name="Neelesh"
          toChangeUser={changingUser}
        />
        <ChatItem
          image="/chakshu.jpg"
          name="Chakshu"
          toChangeUser={changingUser}
        />
        <ChatItem
          image="/shruti.png"
          name="Shruti"
          toChangeUser={changingUser}
        /> */}
        {allUsers.map((user) => {
          return (
            <ChatItem key={user.name} active={user.active} image="" name={user.name} toChangeUser={changingUser} />
          );
        })}
      </Box>
    </Box>
  );
};

export default ChatSection;
