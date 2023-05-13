import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Messages = ({ number, count, setCount }) => {
  const [notification, setNotification] = useState(null);
  const [messages, setMessages] = useState([]);
  const idInstance = useSelector((state) => state.user.idInstance);
  const apiTokenInstance = useSelector((state) => state.user.apiTokenInstance);

  const deleteNotification = async (receiptId) => {
    try {
      const response = await fetch(
        `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
        { method: "DELETE" }
      ); //deleting the notification
      if (response.ok) {
        const data = await response.json();
        console.log("Notification deletion result:", data.result);
      } else {
        console.error("Failed to delete notification:", response.status);
      }
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch(
          `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
        ); //fetch notifications

        if (response.ok) {
          //if there's a notification
          const data = await response.json();
          if (data !== null) {
            setNotification(data.body); //set it's body to notification
            deleteNotification(data.receiptId); //delete the notification
          }
        } else {
          console.error("Failed to receive notification:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch notification:", error);
      }
    };

    const timer = setTimeout(() => {
      //check for notifications every 0.1 sec
      fetchNotification();
    }, 200);

    return () => clearTimeout(timer);
  }, [count]); //count is to check for notifications(didn't find a better way)

  useEffect(() => {
    setMessages([]); //if the number is changed(we try to write to another user), another messages will disappear
  }, [number]);

  useEffect(() => {
    if (!!notification && !notification.messageData) {
      //additional information notification about message, without message text.
      setCount(count + 1); //just pass it
    } else if (!!notification && notification.messageData) {
      console.log(notification);
      //if there's a message text
      if (
        notification.senderData.chatId.includes(number) || //get the messages that related to the number that we provided
        notification.senderData.sender.includes(number)
      ) {
        const newMessage = notification.typeWebhook.includes("API") //to check if it's sent from API or Phone, (different structure)
          ? {
              me: notification.senderData.sender.includes(number) //check who sent it
                ? false
                : true,
              text: notification.messageData.extendedTextMessageData.text,
            }
          : {
              me: notification.senderData.sender.includes(number)
                ? false
                : true,
              text: notification.messageData.textMessageData.textMessage,
            };
        setMessages([...messages, newMessage]); //add message to the state
        setCount(count + 1); //go to the next notification
      }
    }
  }, [notification]);

  return (
    <div>
      <Box display="flex" flexDirection="column" gap="20px">
        {messages.map((m, i) => (
          <Box
            sx={{ alignSelf: m.me ? "start" : "end" }}
            key={i}
            display="flex"
            flexDirection="column"
          >
            <Box
              padding="10px 20px"
              sx={{ bgcolor: "green", borderRadius: "10px" }}
            >
              <Typography color="white">{m.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Messages;
