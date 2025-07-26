/**
 * MessageForm.js
 *
 * This component renders a message input form used to send messages from the logged-in user
 * to another user (identified by `messageReceiverId`). It fetches the receiver's name for UI context,
 * manages local input state, and updates the global Recoil message state on submission.
 */

import React, { useState, useEffect } from "react";
import { allMessagesState, userState } from "../recoil/atoms";
import { useRecoilValue, useRecoilState } from "recoil";

function MessageForm({ messageReceiverId }) {
    const [messageBody, setMessageBody] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const user = useRecoilValue(userState);
    const [messages, setMessages] = useRecoilState(allMessagesState);

    // Fetch the name of the user receiving the message
    useEffect(() => {
        fetch(`https://doggio.onrender.com/users/${messageReceiverId}`)
            .then((r) => r.json())
            .then((user) => {
                const first_name = user.user_name.split(" ")[0];
                setReceiverName(first_name);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const messageData = {
            message_sender_id: user.id,
            message_receiver_id: messageReceiverId,
            message_body: messageBody,
            dog_id: Math.floor(Math.random() * 100) + 1 // Random placeholder dog_id
        };

        fetch("https://doggio.onrender.com/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(messageData),
        })
            .then((response) => response.ok ? response.json() : Promise.reject("Failed to send message"))
            .then((data) => {
                setMessages((prevMessages) => [...prevMessages, data]);
                setMessageBody(""); // Clear input field after successful submission
            })
            .catch((error) => console.log("Error sending message:", error));
    };

    return (
        <div className="ui small form" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="field" style={{ width: "50%" }}>
                <label>Message {receiverName}:</label>
                <input
                    value={messageBody}
                    type="text"
                    onChange={(e) => setMessageBody(e.target.value)}
                />
            </div>
            <div style={{ marginTop: "10px" }}>
                <div className="ui submit button" onClick={handleSubmit}>
                    Submit
                </div>
            </div>
        </div>
    );
}

export default MessageForm;
