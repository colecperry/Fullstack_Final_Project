/**
 * Messages.js
 *
 * This component displays the user's messaging interface. It:
 * - Shows a `MessageForm` to contact a selected breeder (if one is set).
 * - Filters all messages to show only those sent by the logged-in user.
 * - Renders a message preview box for each unique recipient (most recent message only).
 * - Allows users to click a preview box to navigate to a detailed chat with that recipient.
 */

import React from 'react'
import MessageForm from './MessageForm';
import Chats from "./Chats"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/App.css"
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { allMessagesState, breederState, userState } from '../recoil/atoms';

function Messages() {
    const navigate = useNavigate();
    const allMessages = useRecoilValue(allMessagesState);
    const user = useRecoilValue(userState);
    const breeder = useRecoilValue(breederState);
    const user_id = user.id;

    const breeder_name = breeder?.user_name;
    const breeder_id = breeder.id;

    const messages_for_curr_user = allMessages.filter(
        (message) => user_id === message.sending_user?.id
    );

    let message_dict = {};
    let id_to_name = {};

    for (let message of messages_for_curr_user) {
        const receiver_name = message.receiving_user?.user_name;
        const receiverId = message.message_receiver_id;

        id_to_name[receiverId] = receiver_name;
        message_dict[receiverId] = message.message_body;
    }

    const message_dict_entries = Object.entries(message_dict);
    const message_box_components = message_dict_entries.map(
        ([key, value]) => renderMessageBox(key, id_to_name[key], value)
    );

    const display_message_form = breeder_id !== 0;

    return (
        <div>
            <h1 style={{ fontFamily: 'Verdana, sans-serif', marginBottom: "10px" }}>Messages</h1>
            {display_message_form ? <MessageForm messageReceiverId={breeder_id} /> : <div></div>}
            {message_box_components}
        </div>
    );

    function renderMessageBox(receiver_id, messageReceiver, messageBody) {
        return (
            <div
                className="ui huge message"
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: "10px",
                    marginTop: "10px"
                }}
                onClick={() => navigate(`/chats/${receiver_id}`)}
            >
                <img
                    className="circular-image"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6..."
                    alt="Profile"
                    style={{
                        borderRadius: "50%",
                        marginRight: "30px",
                        width: "85px",
                        height: "85px"
                    }}
                />
                <div>
                    <h2 style={{ fontSize: "30px", textAlign: "left" }}>{messageReceiver}</h2>
                    <p style={{ fontSize: "22px", textAlign: "left" }}>{messageBody}</p>
                </div>
            </div>
        );
    }
}

export default Messages;
