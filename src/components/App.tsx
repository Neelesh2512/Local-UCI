import { useState, useEffect } from "react";
import {
  registerOnMessageCallback,
  registerOnSessionCallback,
  send,
} from "./websocket";
import MessageWindow from "./MessageWindow";
import Profile from "./Profile";
import TextBar from "./TextBar";
import {
  useColorModeValue,
  Box,
  Flex,
  Text,
  Spacer,
  interactivity,
} from "@chakra-ui/react";
import { io } from "socket.io-client";
import { startWebsocketConnection } from "./websocket";
import Notification from "./Notifications";
import { useCookies, withCookies } from "react-cookie";
import { useRouter } from "next/router";
import ColorModeSwitcher from "./ColorModeSwitcher";
import { SessionState } from "http2";
import SecNavbar from "./SecNavbar";
import dynamic from 'next/dynamic';


const FontSizeChanger = dynamic(
  () => {
    return import("react-font-size-changer");
  },
  { ssr: false }
);
// import darkImage from "../../public/dark_back.png";
// import lightImage from "../../public/dark_back.jpg";

interface appProps {
  currentUser: { name: string; number: string | null };
}

const App: React.FC<appProps> = ({ currentUser }) => {
  // Router for Navigation
  const router = useRouter();

  // For Authentication
  const [accessToken, setAccessToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [cookies, setCookies] = useCookies();
  const [socket, setSocket] = useState<any>(null);

  const [profileName, setProfileName] = useState("");
  // For showing the Profile
  const [profileOpen, setProfileOpen] = useState(false);

  // Chakra Theme Toggle Information
  const bgImg = useColorModeValue(
    "url('/light_back_2.jpg')",
    "url('/dark_back.png')"
  );
  const bg = useColorModeValue("#06d755", "#202C33");
  const textColor = useColorModeValue("#202C33", "#fff");
  // ----------------------

  const initialState: {
    messages: any[];
    username: string;
    session: any;
  } = {
    messages: [],
    username: "",
    session: {},
  };

  const [state, setState] = useState(initialState);

  const scrollToBottom: () => void = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    setState(initialState);
  }, [currentUser]);

  useEffect(() => {
    if (cookies["access_token"] !== undefined) {
      fetch(`http://localhost:3000/api/auth?token=${cookies["access_token"]}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === {}) {
            throw "Invalid Access Token";
            router.push("/login");
          }
        })
        .catch((err) => {
          throw err;
        });
      setAccessToken(cookies["access_token"]);
    } else {
      router.push("/login");
    }

    setSocket(
      io(`${process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL}`, {
        query: { deviceId: `phone:${localStorage.getItem("phoneNumber")}` },
      })
    );
    setProfileName(localStorage.getItem("profileName") || "");
  }, []);

  useEffect(() => {
    if (socket !== null) {
      startWebsocketConnection(socket);
    }
  }, [socket]);

  useEffect((): void => {
    if (router.query.state || cookies["access_token"] !== "") {
      registerOnMessageCallback(onMessageReceived);
      registerOnSessionCallback(onSessionCreated);
      scrollToBottom();
    } else {
      router.push("/login");
    }
  }, [state]);

  const onSessionCreated = (session: { session: any }): void => {
    // console.log({ session });
    setState({
      ...state,
      session: session,
    });
  };

  const onMessageReceived = (msg: any): void => {
    if (msg.content.msg_type === "IMAGE"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: currentUser.name,
          text: msg.content.title,
          image: msg.content.media_url,
          choices: msg.content.choices,
          caption: msg.content.caption,
        }),
      });
    }
    else if (msg.content.msg_type === "AUDIO"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: currentUser.name,
          text: msg.content.title,
          audio: msg.content.media_url,
          choices: msg.content.choices,
        }),
      });
    }
    else if (msg.content.msg_type === "VIDEO"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: currentUser.name,
          text: msg.content.title,
          video: msg.content.media_url,
          choices: msg.content.choices,
        }),
      });
    }
    else if (msg.content.msg_type === "DOCUMENT"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: currentUser.name,
          text: msg.content.title,
          doc: msg.content.media_url,
          choices: msg.content.choices,
        }),
      });
    }
    else{
      setState({
        ...state,
        messages: state.messages.concat({
          username: currentUser.name,
          text: msg.content.title,
          choices: msg.content.choices,
        }),
      });
    }
  };

  const setUserName = (name: string): void => {
    setState({
      ...state,
      username: name,
    });
  };

  const sendMessage = (text: string, media: any): void => {
    if (!accessToken) {
      router.push("/login");
    } else {
      send(text, state.session, accessToken, currentUser, socket,null);
      if(media){  
        if (media.mimeType.slice(0,5) === "image"){
          setState({
            ...state,
            messages: state.messages.concat({
              username: state.username,
              image: media.url
            }),
          });
        }
        else if (media.mimeType.slice(0,5) === "audio"){
          setState({
            ...state,
            messages: state.messages.concat({
              username: state.username,
              audio: media.url
            }),
          });
        }
        else if (media.mimeType.slice(0,5) === "video"){
          setState({
            ...state,
            messages: state.messages.concat({
              username: state.username,
              video: media.url,
            }),
          });
        }
        else if (media.mimeType.slice(0,11) === "application"){
          setState({
            ...state,
            messages: state.messages.concat({
              username: state.username,
              doc: media.url,
            }),
          });
        }else{
          setState({
            ...state,
            messages: state.messages.concat({
              username: state.username,
              text: text,
              doc: media.url
            }),
          });
        }
      }
      else{
        setState({
          ...state,
          messages: state.messages.concat({
            username: state.username,
            text: text,
          }),
        });
      }
    }
  };

  const sendLocation = (location: any): void => {
    send(location,state.session, accessToken, currentUser, socket,null);
    navigator.geolocation.getCurrentPosition((position: any) => {
      setState({
        ...state,
        messages: state.messages.concat({
          username: state.username,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        }),
      });
    })
   
}

  if (state.username === null) {
    console.log("Please set a username first");
    return (
      <div className="container">
        <div className="container-title">Enter username</div>
        <TextBar onSend={setUserName} onSendLocation={sendLocation} />
      </div>
    );
  }

  

  const selected = (option: any): void => {
    const toSend = option.key + " " + option.text;
    sendMessage(toSend, null);
  };

  const showProfile: () => void = (): void => {
    setProfileOpen(true);
  };

  return (
    <Flex
      flex="3"
      flexDirection="column"
      // position="absolute"
    >
      {/* Heading */}
      <Flex
        backgroundImage={"url('/sidebar.png')"}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundBlendMode="multiply"
        bgColor={bg}
        flex="1"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        width="75%"
        flexWrap="wrap"
        zIndex="1"
      >
        <Box p="1rem" color={textColor}>
          <h1>{currentUser.name}</h1>
        </Box>
        <Spacer />
        <Flex
          p="1rem"
          justifyContent="center"
          alignItems="center"
          onClick={(event) => {
            if (event.stopPropagation) event.stopPropagation();
            return false;
          }}
        >
          <FontSizeChanger 
          targets={['.chat-message','.chat-choices','.chat-error-message']}
          options ={{
            stepSize: 2,
            range: 4
          }}
          customButtons={{
            up: <span style={{'fontSize': '15px', cursor: 'zoom-in'}}>A+</span>,
            down: <span style={{'fontSize': '15px', cursor: 'zoom-out'}}>A-</span>,
            style: {
              backgroundColor: '#000',
              color: 'white',
              WebkitBoxSizing: 'border-box',
              WebkitBorderRadius: '5px',
              width: '40px',
              height: '30px',
              paddingBottom: '40px',
              
            },
            buttonsMargin: 20
          }}
          />
          <SecNavbar />
          <ColorModeSwitcher />
        </Flex>
      </Flex>

      {/* Chat Body Container */}
      <Box
      bgImage={bgImg}
        backgroundPosition="cover"
        flex="10"
        z-index="2"
        
        display="flex"
        justifyContent="center"
      >
        {/* Chat Body */}
        <Box
          p="0 1rem 2rem 1rem"
          transition="opacity 200ms"
          width="100%"
          height="95vh"
          paddingBottom="3rem"
          overflow="scroll"
          className="chat-body"
        >
          <MessageWindow
            messages={state.messages}
            username={state.username}
            selected={selected}
          />
        </Box>

        <TextBar onSend={sendMessage} onSendLocation={sendLocation} />
      </Box>
    </Flex>
  );
};

export default App;
