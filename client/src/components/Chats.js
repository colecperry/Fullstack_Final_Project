import React from 'react'
import MessageForm from './MessageForm';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/App.css"
import { useNavigate, useParams } from 'react-router-dom';
import { allMessagesState, userState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';

function Chats() {
    const { receiver_user_id } = useParams();
    const allMessages = useRecoilValue(allMessagesState);
    const user = useRecoilValue(userState);
    let messageReceiver = null; // Declare messageReceiver variable
    let messageReceiverId = null;

    const singleMessage = allMessages.map((message) => {
        const messageBody = message.message_body;
        const messageSender = message.sending_user.user_name;
        const currentMessageReceiver = message.receiving_user?.user_name;
        const currentMessageReceiverId = message.receiving_user?.id

        // console.log(message)
        

        if (user.id == message?.sending_user?.id) {
            console.log("currentMessageReceiverId", currentMessageReceiverId)
            console.log("receiver_user_id", receiver_user_id)
            if (currentMessageReceiverId == receiver_user_id) {
                messageReceiver = currentMessageReceiver; // Assign currentMessageReceiver to messageReceiver variable
                messageReceiverId = currentMessageReceiverId
                // console.log(messageReceiver);
                return renderSingleMessage(messageReceiver, messageSender, messageBody);
            }
        }

        return null;
    });

    function renderSingleMessage(messageReceiver, messageSender, messageBody) {
        return (
            <Container fluid="lg" className="chats">
                <Row>
                    <Col>{messageBody}</Col>
                </Row>
            </Container>
        );
    }

    return (
        <div>
            <h1>{messageReceiver}</h1>
            <div>{singleMessage}</div>
            <MessageForm messageReceiverId={messageReceiverId}/>
        </div>
    );
}
export default Chats;