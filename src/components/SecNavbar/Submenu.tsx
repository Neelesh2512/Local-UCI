import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Flex,
    Box,
    Switch,
    Button,
  } from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import styles from "/src/components/SecNavbar/index.module.css";
import { useEffect, useState } from "react";


const Submenu = (props : any) => {
  //const doodly = "https://raw.githubusercontent.com/Neelesh2512/hosted-assets/main/Desktop%20-%201.png";
  const doodly  = "https://raw.githubusercontent.com/Neelesh2512/hosted-assets/main/whatsapp%20background.png";
  const [doodle, setdoodle] = useState("Enable doodle ?");
  const [hex, sethex] = useState("#ffffff");

  const randomHex = () => {
      // var hexy = "#" + Math.floor(Math.random() * 16777215).toString(16);
      let hexy = "#";
      for (let i = 0; i < 3; i++)
        hexy += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
        
      sethex(hexy);
      var wallpaper = document.getElementsByClassName("chat-body") as HTMLCollectionOf<HTMLElement>;
      wallpaper[0].style.backgroundColor = hexy;
      localStorage.setItem("hex", hexy);

  }


useEffect(() => {
  if(localStorage.getItem("hex") !== null){
    sethex(localStorage.getItem("hex") || '');
    var wallpaper = document.getElementsByClassName("chat-body") as HTMLCollectionOf<HTMLElement>;
    wallpaper[0].style.backgroundColor = localStorage.getItem("hex") || '';
  }

  if(localStorage.getItem("doodle") === "Disable doodle ?"){
    setdoodle(localStorage.getItem("doodle") || '');
    var wallpaper = document.getElementsByClassName("chat-body") as HTMLCollectionOf<HTMLElement>;
    wallpaper[0].style.backgroundImage = "url("+doodly+")";
  }
})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setdoodle(localStorage.getItem("doodle") || "Enable doodle ?");
      sethex(localStorage.getItem("hex") || "#ffffff");
    }
  },[]); 


  
  const doodle1 = () => {
    let val = doodle;
    if(val === "Enable doodle ?"){
      var wallpaper = document.getElementsByClassName("chat-body") as HTMLCollectionOf<HTMLElement>;
      wallpaper[0].style.backgroundImage = "url("+doodly+")";
      setdoodle("Disable doodle ?");
      localStorage.setItem("doodle", "Disable doodle ?");
    }
    else if(val === "Disable doodle ?"){
      var wallpaper = document.getElementsByClassName("chat-body") as HTMLCollectionOf<HTMLElement>;
      wallpaper[0].style.backgroundImage = "none";
      setdoodle("Enable doodle ?");
      localStorage.setItem("doodle", "Enable doodle ?");
    }
  }

    return (
    <Menu>
      <MenuButton className={styles.item} style={{width:"100%"}}  >
        Wallpapers <ChevronDownIcon />
      </MenuButton>
      <MenuList className={styles.sublist}>
        {/* <MenuItem className={styles.subitem}>
        <div onClick={props.orig} className={styles.wallbtn2}>Default wallpaper</div>
        </MenuItem>
        <MenuItem className={styles.subitem}>
        <div onClick={props.wall1} className={styles.wallbtn1}>wallpaper 1</div>
        </MenuItem>
        <MenuItem className={styles.subitem}>
        <div onClick={props.wall2} className={styles.wallbtn3}>wallpaper 2</div>
        </MenuItem> */}
        <div className={styles.bgcolor} onClick={randomHex}>Change Bg colour</div>
        <div className={styles.bgcolor} onClick={doodle1}>{doodle}</div>
      </MenuList>
    </Menu>
    
    );
  }
export default Submenu;