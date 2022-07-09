import React, { MutableRefObject, RefObject, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { Input, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdSend, MdLocationOn, MdUploadFile} from "react-icons/md";
interface textBarProps {
    onSend: (name: string) => void,
}

const TextBar = (props: any) => {

  const [location, setLocation] = useState("");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLocation(`https://www.google.com/maps?q=${lat},${long}+&output=embed`);
          //props?.onSend && props.onSend(url());
        }
      );
    }
    else{
      toast.error("Geolocation is not supported by this browser.");
    }
  },[])

   // Toggle Settings
   const bg = useColorModeValue("#06d755","#202C33");
   const textColor = useColorModeValue("#000","#fff");
   const faIcon = useColorModeValue("#202C33","#fff");
   // ---------------

  const input: MutableRefObject<HTMLInputElement | null > = useRef<HTMLInputElement | null>(null);

    const sendMessage = (e: any) => {
      e.preventDefault();
      const message: string | undefined = input.current?.value;
      if(input.current?.value.trim().length === 0) {
        toast.error("Please enter a valid message");
      }
      else if (message!.length > 0 ){
        props?.onSend && props.onSend(input.current!.value);
      }
      input.current!.value = "";
    };

  const sendMessageIfEnter: React.KeyboardEventHandler = (e: React.KeyboardEvent) => {
    if (+e.key === 13 && input.current!.value.length > 0) {
      sendMessage(e);
    }

  };

  const sendLocation = (e: any) => {
    e.preventDefault();
    props.onSendLocation(location);
  };

  const uploadMedia = async (fileObj: any) => {
    const data = new FormData();
    data.append('file',fileObj);
    try{
        let res = await fetch(
        `http://143.110.255.220:8080/cdn/minioSignedUrl`,
        {
            method: 'post',
            body: data,
        }
        );
        let responseJson = await res.json();
        if (res.status === 200) {
            props.onSend(null, responseJson)
        }else{      
            console.log('image not uploaded')
        }
    }
    catch{
        console.error('no response received');
    }    
  };
  return (
    <>
      <ToastContainer />
      <Box className="chat__footer" width="75%">
        <form>
          <Input
            color={"black"}
            placeholder="Type your message"
            _placeholder={{color: "black"}}
            ref={input}
            onKeyDown={sendMessageIfEnter}
          />
          <div className="file btn btn-primary" 
            style={
              { position: "relative", 
                overflow: "hidden", 
                marginRight: '7px', 
                paddingTop: '10px'
              }}>
                <MdUploadFile />
                <input type="file" name="file" 
                style={
                  {position: "absolute", 
                   fontSize: "50px", 
                   opacity: "0", 
                   right: "0", 
                   top: "0"}
                  }
                  onChange={(event) => {
                    uploadMedia(event.target.files[0])
                  }}/>
          </div>
           <button type="submit" onClick={sendLocation} className="file btn btn-primary"><MdLocationOn /></button>      
          <Button bgColor={bg} color={faIcon} w="46px" h="46px" borderRadius="50%" boxShadow="0px 0px 2px 0px #0000005e" border="none"  className="send__btn" onClick={sendMessage} type="submit">
           <FontAwesomeIcon icon={faPaperPlane}  />
          </Button>
        </form>
      </Box>
    </>
  );
};

export default TextBar;
