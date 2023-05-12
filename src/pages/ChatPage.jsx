import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Box, TextField, styled, Button } from "@mui/material";
import Messages from "./Messages.jsx";

const WrapperBox = styled(Box)(() => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "1000px",
  maxHeight: "800px",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  border: "1px solid gray",
  borderRadius: "10px",
}));

const ChatPage = () => {
  const [message, setMessage] = useState("Hello atom");
  const [number, setNumber] = useState("37498393978");
  const [count, setCount] = useState(0);
  const idInstance = useSelector((state) => state.user.idInstance);
  const apiTokenInstance = useSelector((state) => state.user.apiTokenInstance);
  const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;

  const sendMessage = async () => {
    setCount(count + 1);
    setMessage("");
    if (number && message) {
      try {
        const data = {
          chatId: `${number}@c.us`,
          message,
        };

        const response = await axios.post(url, data);
        console.log(response.data); // Process the response as needed
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Fill in all the fields");
    }
  };

  if (!idInstance || !apiTokenInstance) {
    return <Navigate to="/login" />;
  }

  return (
    <WrapperBox sx={{ bgcolor: "white" }}>
      <Box
        display="flex"
        alignItems="center"
        padding="10px"
        sx={{ borderBottom: "1px solid gray" }}
      >
        <Box flex="1">
          <TextField
            label="who to message..."
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="search for contacts"
            sx={{
              [`& fieldset`]: {
                borderRadius: 100,
              },
            }}
            size="small"
          />
        </Box>
        <Button
          onClick={() => setCount(count + 1)}
          color="success"
          variant="contained"
          sx={{
            borderRadius: "10px",
            textTransform: "none",
          }}
        >
          Check for messages
        </Button>
      </Box>
      <Box height="100%" overflow="auto" padding="20px">
        <Messages number={number} count={count} setCount={setCount} />
      </Box>
      <Box display="flex" gap="10px" padding="10px" borderTop="1px solid gray">
        <TextField
          value={message}
          size="small"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          sx={{
            flex: 1,
            [`& fieldset`]: {
              borderRadius: "10px",
            },
          }}
        />
        <Button
          onClick={sendMessage}
          color="success"
          variant="contained"
          sx={{ borderRadius: "10px" }}
        >
          Send
        </Button>
      </Box>
    </WrapperBox>
  );
};

export default ChatPage;
