import React, { useState } from "react";

function MessageForm() {
    const [messageBody, setMessageBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create a message object
        const messageData = {
        messageBody: messageBody,
        };

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
            // Reset the form
            setMessageBody("");
            } else {
            console.log("Failed to send message");
            }
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