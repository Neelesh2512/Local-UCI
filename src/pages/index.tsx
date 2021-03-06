import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import App from "../components/App";
import Settings from "../components/Settings";
import ChatSection from "../components/ChatSection";
import React from "react";
// import * as serviceWorker from "../utils/serviceWorker";
import { CookiesProvider } from "react-cookie";
import { ColorModeScript, Flex, Box } from "@chakra-ui/react";
import { startWebsocketConnection } from "../components/websocket";

const Home: NextPage = () => {

  const [toggleSettings, setToggleSettings] = useState(0);

  const showSettings: React.MouseEventHandler  = (event: React.MouseEvent) => {
    setToggleSettings(1);
  }
  const showChatSection: React.MouseEventHandler = (event: React.MouseEvent) => {
    setToggleSettings(0);
  }

  return (
    <React.StrictMode>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <title>UCI PWA</title>
      </Head>
      <CookiesProvider>
        <Flex>
          {toggleSettings===0 ? <ChatSection toShowSettings={showSettings} />: <Settings toShowChatSection={showChatSection} /> }
          
          <App />
        </Flex>

        <ColorModeScript />
      </CookiesProvider>
    </React.StrictMode>
  );
};
export default Home;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
startWebsocketConnection();
