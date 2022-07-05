import { useState, useEffect } from 'react';
import {
    registerOnMessageCallback,
    registerOnSessionCallback,
    send,
  } from "./websocket";
import MessageWindow from "./MessageWindow";
import TextBar from "./TextBar";
import Notification from "./Notifications";
import SecNavbar from './SecNavbar';
//import FontSizeChanger from 'react-font-size-changer';
import dynamic from 'next/dynamic';
import { position } from '@chakra-ui/react';

const FontSizeChanger = dynamic(
  () => {
    return import("react-font-size-changer");
  },
  { ssr: false }
);

const App = (props:any): any => {

    const initialState: {
      messages: any[];
      username: string;
      session: any;
    } = {
      messages: [],
      username: "chaks",
      session: {},
    };
  
    const [state, setState] = useState(initialState);
    
    const scrollToBottom = () => {
      window.scrollTo(0, document.body.scrollHeight);
    };
  
    useEffect((): void => {
      registerOnMessageCallback(onMessageReceived);
      registerOnSessionCallback(onSessionCreated);
      scrollToBottom();
    }, [state]);
  
    const onSessionCreated = (session: any) => {
      console.log({ session });
      setState({
        ...state,
        session: session,
      });
    };
  
    const onMessageReceived = (msg: any) => {
      // let message = msg.content.title;
      // if (msg.content.choices && msg.content.choices.length > 0) {
      //   for (let i = 0; i < msg.content.choices.length; i++) {
      //     message =
      //       message +
      //       "\n" +
      //       msg.content.choices[i].key +
      //       ". " +
      //       msg.content.choices[i].text;
      //   }
      //   console.log(msg.content.choices);
      // }
      if (msg.content.msg_type === "IMAGE"){
        setState({
          ...state,
          messages: state.messages.concat({
            username: "UCI",
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
            username: "UCI",
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
            username: "UCI",
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
            username: "UCI",
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
            username: "UCI",
            text: msg.content.title,
            choices: msg.content.choices,
          }),
        });
      }
    };
  
    const setUserName = (name: string) => {
      setState({
        ...state,
        username: name,
      });
    };
  
    const sendMessage = (text: any, media: any) => {
      send(text, state.session, media);
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
  
    const sendLocation = (location: any): void => {
        send(location,state.session,null);
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


    const selected = (option: any) => {
      const toSend = option.key+" "+option.text;
      sendMessage(toSend, null);
    }
  
    return (
      <>
        <div className="chat-header">
          <div className="chat__header--info">
            <h3>Chakshu Gautam</h3>
          </div>
          <div className="font-change">
        <FontSizeChanger 
          targets={['.chat-message','.chat-choices','.chat-error-message']}
          options={{
            stepSize: 2,
            range: 4
          }}
          customButtons={{
            up: <span style={{'fontSize': '15px', cursor: 'zoom-in'}}>A+</span>,
            down: <span style={{'fontSize': '15px', cursor: 'zoom-out'}}>A-</span>,
            style: {
              backgroundColor: '#000080',
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
        </div>
          <SecNavbar />
          <div className="chat__header--right">
            {/* <Notification /> */}
          </div>
        </div>
        <div className="chat-body-container">
          <div className="chat-body">         
            <MessageWindow messages={state.messages} username={state.username} selected={selected}/>          
          </div>
          <TextBar onSend={sendMessage} onSendLocation={sendLocation} />
        </div>
      </>
    );
  };


export default App;