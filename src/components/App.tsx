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
  Image,
  interactivity,
} from "@chakra-ui/react";
import { io, Socket } from "socket.io-client";
import { startWebsocketConnection } from "./websocket";
import Notification from "./Notifications";
import { useCookies, withCookies } from "react-cookie";
import { useRouter } from "next/router";
import ColorModeSwitcher from "./ColorModeSwitcher";
import { SessionState } from "http2";
import { useCol } from "react-bootstrap/esm/Col";
import PhoneView from "./PhoneView/index";
import WebView from "./WebView";
import RecentChats from "./PhoneView/RecentChats";



interface appProps {
  currentUser: { name: string; number: string | null };
  allUsers: { name: string; number: string | null; active: boolean }[];
  userName: string;
  toChangeCurrentUser:  (name: string, number: string | null) => void;
  toAddUser: (newName: string, newNumber: string) => void;
  toRemoveUser: (name: string, number: string | null) => void;
}

type recievedMessage = botMessage | humanMessage;

type botMessage = {
  content: {
    caption: any;
    choices: { key: string; text: string; backmenu: boolean }[];
    media_url: any;
    title: string;
  };
  from: string;
};

type humanMessage = {
  content: {
    title: string;
    from: string;
    choices: null;
  };
  from: string;
};

const App: React.FC<appProps> = ({ toRemoveUser, currentUser, allUsers, userName, toChangeCurrentUser,toAddUser }) => {
  // Router for Navigation
  const router = useRouter();

  // For Authentication
  const [accessToken, setAccessToken] = useState("");
  const [cookies, setCookies] = useCookies();
  const [socket, setSocket] = useState<Socket>();
  const [profileName, setProfileName] = useState(userName);


  const initialState: {
    messages: any[];
    username: string;
    session: any;
  } = {
    messages: [],
    username: "",
    session: {},
  };

  const [state, setState] = useState<{
    messages: any[];
    username: string;
    session: any;
  }>(initialState);

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
  }, []);

  useEffect(() => {
    if (socket !== undefined) {
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
    setState({
      ...state,
      session: session,
    });
  };

  const onMessageReceived = (msg: recievedMessage): void => {
    console.log("The message is");
    console.log(msg);
    if (msg.from.split(":")[1] === currentUser.number) {
      setState({
        ...state,
        messages: state.messages.concat({
          username: currentUser.name,
          text: msg.content.title,
          choices: msg.content.choices,
        }),
      });
    } else if (currentUser.number === null) {
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

  const sendMessage = (text: string): void => {
    if (!accessToken) {
      router.push("/login");
    } else {
      send(text, state.session, accessToken, currentUser, socket);
      setState({
        ...state,
        messages: state.messages.concat({
          username: state.username,
          text: text,
        }),
      });
    }
  };

  if (state.username === null) {
    console.log("Please set a username first");
    return (
      <div className="container">
        <div className="container-title">Enter username</div>
        <TextBar onSend={setUserName} />
      </div>
    );
  }

  const selected = (option: {
    key: string;
    text: string;
    backmenu: boolean;
  }): void => {
    const toSend = option.key + " " + option.text;
    sendMessage(toSend);
  };
  const sizeVar = useWindowSize();
  if (sizeVar.width < 768) {
    return (
      <PhoneView
        messages={state.messages}
        username={state.username}
        selected={selected}
        sendMessageFunc={sendMessage}
        allUsers={allUsers}
        toChangeCurrentUser={toChangeCurrentUser}
        currentUser={currentUser}
        addingNewUser={toAddUser}
        toRemoveUser={toRemoveUser}
      />
    );
  } else {
    return (
      <WebView
        messages={state.messages}
        username={state.username}
        selected={selected}
        sendMessageFunc={sendMessage}
        allUsers={allUsers}
        toChangeCurrentUser={toChangeCurrentUser}
        currentUser={currentUser}
        addingNewUser={toAddUser}
        toRemoveUser={toRemoveUser}
      />
    );
  }
};

export default App;

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize

      // Set window width/height to state

      // Add event listener
      window.addEventListener("resize", () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });

      // Call handler right away so state gets updated with initial window size
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Remove event listener on cleanup
      return () =>
        window.removeEventListener("resize", () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        });
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
