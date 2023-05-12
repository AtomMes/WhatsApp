import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ChatPage = () => {
  const [message, setMessage] = useState("Hello atom");
  const [number, setNumber] = useState("37498393978");

  const idInstance = useSelector((state) => state.user.idInstance);
  const apiTokenInstance = useSelector((state) => state.user.apiTokenInstance);

  const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;

  const sendMessage = async () => {
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
    <div>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Phone Number"
      />
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button onClick={sendMessage}>Send the message</button>
    </div>
  );
};

export default ChatPage;
