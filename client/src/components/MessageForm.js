import React, { useState } from "react";
import { allMessagesState, userState } from "../recoil/atoms";
import { useRecoilValue, useRecoilState } from "recoil";

function MessageForm({ message }) {
    const [messageBody, setMessageBody] = useState("");
    const user = useRecoilValue(userState);
    const [messages, setMessages] = useRecoilState(allMessagesState);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a message object
        const messageData = {
        message_sender_id: user.id,
        message_receiver_id: message.receiving_user.id,
        message_body: messageBody,
        dog_id: Math.floor(Math.random() * 100) + 1
        };
        console.log(messageData)

        // Send POST request to the /messages endpoint
        fetch("/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
        })
        .then((response) => {
            if (response.ok) {
            console.log("Message sent successfully");

            // Get the newly created message's ID from the API response
            return response.json(); // assuming the response contains the created message object
            } else {
            console.log("Failed to send message");
            }
        })
        .then((data) => {
            // Assign the newly created message's ID to newMessage
            const newMessage = {
            id: data.id, // assuming the ID property exists in the response data
            message_sender_id: messageData.message_sender_id,
            message_body: messageData.message_body,
            // dog_id:
            };

            setMessages([...messages, newMessage]);

            // Reset the form
            setMessageBody("");
        })
        .catch((error) => {
            console.log("Error sending message:", error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="messageBody">Message Body:</label>
        <input
            type="text"
            id="messageBody"
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
        />
        <button type="submit">Submit</button>
        </form>
    );
}

export default MessageForm;