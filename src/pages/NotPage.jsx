import React, { useEffect, useState } from "react";

const ReceiveNotification = () => {
  const [notification, setNotification] = useState(null);
  const [count, setCount] = useState(0);
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
        // Handle error response
        console.error("Failed to delete notification:", response.status);
      }
    } catch (error) {
      // Handle network or other errors
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
          // Handle error response
          console.error("Failed to receive notification:", response.status);
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Failed to fetch notification:", error);
      }
    };

    const timer = setTimeout(() => {
      fetchNotification();
    }, 100); // Wait for 5 seconds before requesting the next notification

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [count]);

  useEffect(() => {
    if (!!notification && !notification.messageData) {
      setCount(count + 1);
    } else if (!!notification && notification.messageData) {
      const newMessage = notification.typeWebhook.includes("API")
        ? {
            sender: notification.senderData.chatName,
            text: notification.messageData.extendedTextMessageData.text,
          }
        : {
            sender: notification.senderData.chatName,
            text: notification.messageData.textMessageData.textMessage,
          };
      setMessages([...messages, newMessage]);
      setCount(count + 1);
    }
  }, [notification]);

  console.log(messages);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <div>
        {messages.map((m, i) => (
          <div key={i}>
            <div>
              {m.sender}---{m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiveNotification;
