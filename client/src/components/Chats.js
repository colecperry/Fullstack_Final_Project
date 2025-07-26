/**
 * Chats.js
 *
 * This component handles rendering of one-on-one chat messages between the logged-in user
 * and another user (identified via the URL parameter `receiver_user_id`). It pulls messages
 * from Recoil state and conditionally renders only the relevant chat history.
 * Also renders a MessageForm component for sending new messages to the selected recipient.
 */

import React from 'react';
import MessageForm from './MessageForm';
import { useState } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import "../assets/App.css"
import { useNavigate, useParams } from 'react-router-dom';
import { allMessagesState, userState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';

function Chats() {
    // Extract receiver's ID from route parameters
    const { receiver_user_id } = useParams();

    // Get all messages and the current user from Recoil state
    const allMessages = useRecoilValue(allMessagesState);
    const user = useRecoilValue(userState);

    // These will be used to render the conversation header and pass to MessageForm
    let messageReceiver = null;
    let messageReceiverId = null;

    // Filter and render only messages sent by the current user to the specific receiver
    const singleMessage = allMessages.map((message) => {
        const messageBody = message.message_body;
        const messageSender = message.sending_user.user_name;
        const currentMessageReceiver = message.receiving_user?.user_name;
        const currentMessageReceiverId = message.receiving_user?.id;

        // Check if the current user is the sender
        if (user.id == message?.sending_user?.id) {
            // Only display messages sent to the selected user
            if (currentMessageReceiverId == receiver_user_id) {
                messageReceiver = currentMessageReceiver;
                messageReceiverId = currentMessageReceiverId;
                return renderSingleMessage(messageReceiver, messageSender, messageBody);
            }
        }

        return null;
    });

    // Helper function to format a single message box
    function renderSingleMessage(messageReceiver, messageSender, messageBody) {
        return (
            <div
                className="ui small message"
                style={{
                    marginBottom: "10px",
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <p><b>{messageSender}:</b> {messageBody}</p>
            </div>
        );
    }

    return (
        <div>
            {/* Display receiver's name as the header */}
            <h1>{messageReceiver}</h1>

            {/* Render the conversation */}
            <div>{singleMessage}</div>

            {/* Message form to send new messages */}
            <MessageForm messageReceiverId={messageReceiverId} />
        </div>
    );
}

export default Chats;
