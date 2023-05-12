import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Messages = ({ number, count, setCount }) => {
  const [notification, setNotification] = useState(null);
  const [messages, setMessages] = useState([]);

  const deleteNotification = async (receiptId) => {
    try {
      const response = await fetch(
        `https://api.green-api.com/waInstance1101818622/DeleteNotification/f445b0dd699b44f5a7d3ed3fd540246a2551f2173abf4709ba/${receiptId}`,
        { method: "DELETE" }
      );
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
          "https://api.green-api.com/waInstance1101818622/ReceiveNotification/f445b0dd699b44f5a7d3ed3fd540246a2551f2173abf4709ba"
        );

        if (response.ok) {
          const data = await response.json();
          if (data !== null) {
            setNotification(data.body);
            deleteNotification(data.receiptId);
          }
        } else {
          console.error("Failed to receive notification:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch notification:", error);
      }
    };

    const timer = setTimeout(() => {
      fetchNotification();
    }, 100);

    return () => clearTimeout(timer);
  }, [count]);

  useEffect(() => {
    setMessages([]);
  }, [number]);

  useEffect(() => {
    if (!!notification && !notification.messageData) {
      setCount(count + 1);
    } else if (!!notification && notification.messageData) {
      if (
        notification.senderData.chatId.includes(number) ||
        notification.senderData.sender.includes(number)
      ) {
        const newMessage = notification.typeWebhook.includes("API")
          ? {
              me: notification.senderData.sender.includes(number)
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
        setMessages([...messages, newMessage]);
        setCount(count + 1);
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
