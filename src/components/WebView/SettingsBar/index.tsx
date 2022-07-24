import React from "react";
import { useState } from 'react';
import { background, Box } from "@chakra-ui/react";
import styles from "./index.module.css";
import SettingsButton from "./Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faDesktop,
  faCampground,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useColorModeValue } from "@chakra-ui/react";


const SettingsBar: React.FC = () => {
  const backgroundColorToggle = useColorModeValue(styles.lightContainer,styles.darkContainer)

    const [allButtons,setAllButtons] = useState<{key: string,icon: IconDefinition, active: boolean}[]>([
        {
            key: '1',
            icon: faCampground,
            active: false
        },
        {
            key: '2',
            icon: faCog,
            active: true
        },
        {
            key: '3',
            icon: faDesktop,
            active: false
        }
    ])


    const onChangeCurrentButton = (icon: IconDefinition) => {
        
        const newButtons = allButtons.map( (button) => {
            if (button.icon === icon) {
                button.active = !button.active;
                return button;
            } else {
                return button;
            }
        })

        setAllButtons(newButtons)
    }

//   const onChangeCurrentUser = (name: string, number: string|null) => {
//     const myUser = users.find((user) => {
//       return user.name === name;
//     }) || { name: "UCI", number: null };
//     users.forEach((user, index) => {
//       if (user.name === name && user.number === number) {
//         user.active = true;
//       } else if (user.active === true) {
//         user.active = false;
//       }
//     });
//     setCurrentUser(myUser);
//   };

  return (
    <React.Fragment>
      <Box className={`${styles.container} ${backgroundColorToggle}`}>
        {/* C4GT Logo */}
        <Box className={styles.c4gtLogo}></Box>

        {/* Settings Button */}
        <Box className={styles.settingsContainer}>
            {allButtons.map((button) => {
                return (<SettingsButton key={button.key} toChangeActiveState={onChangeCurrentButton} icon={button.icon} active={button.active} width="2rem" height="2rem" />)
            })}
          {/* <SettingsButton
            icon={faCampground}
            active={false}
            width="2rem"
            height="2rem"
          />
          <SettingsButton
            icon={faCog}
            active={true}
            width="2rem"
            height="2rem"
          />
          <SettingsButton
            icon={faDesktop}
            active={false}
            width="2rem"
            height="2rem"
          /> */}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SettingsBar;
