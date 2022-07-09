import styles from "./profile.module.css";
import avatar from "../../../public/avatar.jpg";
import { Box, Text, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import ReactDom from "react-dom";

interface profileProps {
  removeProfile: () => void;
  name: string;
  userImg: string;
  show: boolean
  // number: string;
  // bio: string;
}

const Profile: React.FC<profileProps> = ({ show,userImg, name, removeProfile }) => {


  const fontColor = useColorModeValue("#fff","#fff");

  const [userBio,setUserBio] = useState("");

  // useEffect(() => {
    // setUserBio(JSON.parse(localStorage.getItem("UCI_users") || "")[name]["bio"] || "")
  // })


  return show? (ReactDom.createPortal(
    <>
      <Box
        cursor="pointer"
        onClick={removeProfile}
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundColor="rgba(0,0,0,0.8)"
        zIndex="1000"
      />
      <Box
        position="fixed"
        top="50%"
        left="50%"
        zIndex="1000"
        transform="translate(-50%,-50%)"
      >
        <figure
          className={styles.container}
          style={{
            position: "relative",
            backgroundColor: "#141414",
            width: "315px",
          }}
        >
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
            alt="coverPic"
            style={{
              maxWidth: "100%",
              opacity: "0.75",
              verticalAlign: "top",
            }}
          />
          <figcaption
            style={{
              width: "100%",
              backgroundColor: "#141414",
              padding: "25px",
              position: "relative",
              color: `${fontColor}`
            }}
          >
            <img
              src={userImg}
              alt="profilePic"
              style={{
                borderRadius: "50%",
                maxWidth: "90px",
                zIndex: "1",
                bottom: "100%",
                left: "25px",
                position: "absolute",
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
              }}
            />
            <h2
              style={{
                margin: "0 0 5px",
              }}
            >
              {name}<span>User</span>
            </h2>
            <p>
              {userBio}
            </p>
          </figcaption>
        </figure>
      </Box>
    </>,
    document.getElementById("modal_portal") as HTMLDivElement
  )) : null 
};

export default Profile;
