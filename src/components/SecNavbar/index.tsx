import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
} from "@chakra-ui/react";

import styles from "/src/components/SecNavbar/index.module.css";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button } from "react-bootstrap";
import { forwardRef, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Submenu from './Submenu';


const wallpaper_1 = "https://cdn.wallpapersafari.com/98/39/9My6KE.jpg";
const wallpaper_2 = "https://c4.wallpaperflare.com/wallpaper/459/528/47/faces-syringe-piling-up-figures-wallpaper-preview.jpg";





const SecNavbar = () => {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme(localStorage.getItem("theme") || "");
    }
  },[]); 

  useEffect(() => {
    if (theme === "green") {
      wallpaper1();
    } else if (theme === "red") {
      wallpaper2();
    }
  },[theme]);

  const wallpaper1 = () => {
    var wallpaper = document.getElementsByClassName("chat-body") as HTMLCollectionOf<HTMLElement>;
    wallpaper[0].style.backgroundImage = "url("+wallpaper_1+")";
    setTheme("green");
    localStorage.setItem("theme", "green");
  }
  
  const wallpaper2 = () => {
    var wallpaper = document.getElementsByClassName("chat-body") as HTMLCollectionOf<HTMLElement>;
    wallpaper[0].style.backgroundImage = "url("+wallpaper_2+")";
    setTheme("red");
    localStorage.setItem("theme", "red");
  }
  
  const original = () => {
    var wallpaper = document.getElementsByClassName("chat-body") as HTMLCollectionOf<HTMLElement>;
    wallpaper[0].style.backgroundImage = "none";
    wallpaper[0].style.backgroundColor = "white";
    setTheme("");
    localStorage.setItem("theme","");
  }
  
const router = useRouter();
return (

  <Flex p="2" borderBottom="1px">
    <Box>
    <Menu>
        <MenuButton className={styles.menuBox}
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
          style={{width: "60px", height: "20px"}}
        />
        <MenuList className={styles.navbar}>
          <Link href="/">
          <MenuItem className={styles.item} >
            Home
          </MenuItem>
          </Link>
          {/* <Link href="/profilepage">
          <MenuItem className={styles.item} >
            Profile Page
          </MenuItem>
          </Link> */}
          <Submenu wall1={wallpaper1} wall2={wallpaper2} orig={original} />
        </MenuList>
    </Menu>
    </Box>
  </Flex>
)};

export default SecNavbar;
