import {border, Box,Flex,Text} from '@chakra-ui/react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useColorModeValue } from "@chakra-ui/react";
import styles from "./RecentChats.module.css";
interface settingProps {
    icon: IconDefinition,
    settingName: string
    clickFunction: (event: React.MouseEvent) => void 
}

const setting: React.FC<settingProps> = ({icon, settingName, clickFunction}) => {

    const borderColor = useColorModeValue("#000","#fff");

    return (
        <Flex cursor="pointer" height="80px" onClick={clickFunction} my="1rem" className={styles.settingItem}>
            <Flex fontSize="35px" flex="1" alignItems="center" justifyContent="center" className={styles.settingItem2}>
                <FontAwesomeIcon icon={icon} />
            </Flex>
            <Flex ml="0.5rem" pl="0.5rem"  flex="4" fontWeight="extrabold" alignItems="center" className={styles.settingItem2}>
                <Text>{settingName}</Text>
            </Flex>
        </Flex>
    )
}


export default setting;