import React from 'react'
import MessageForm from './MessageForm';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/App.css"
import { useNavigate } from 'react-router-dom';
import { allMessagesState, userState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';

function Chats() {
    const allMessages = useRecoilValue(allMessagesState);
    const user = useRecoilValue(userState);
    let messageReceiver = null; // Declare messageReceiver variable

    const singleMessage = allMessages.map((message) => {
        const messageBody = message.message_body;
        const messageSender = message.sending_user.user_name;
        const currentMessageReceiver = message.receiving_user?.user_name;

        if (user.id === message?.sending_user?.id && currentMessageReceiver) {
            messageReceiver = currentMessageReceiver; // Assign currentMessageReceiver to messageReceiver variable
            console.log(messageReceiver);
            return renderSingleMessage(messageReceiver, messageSender, messageBody);
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
            <MessageForm />
        </div>
    );
}
export default Chats;