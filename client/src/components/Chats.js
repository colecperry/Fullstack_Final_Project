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
    const allMessages = useRecoilValue(allMessagesState)
    const user = useRecoilValue(userState)
    const [receiver, setReceiver] = useState([])
    let messageReceiver


    const singleMessage = allMessages.map((message) => {
        const messageBody = message.message_body
        const messageSender = message.user.user_name
        

        if (user.id === message.user.id) {
            messageReceiver = message.dog.user.user_name
            // setReceiver(messageReceiver)
            return renderSingleMessage(messageReceiver, messageSender, messageBody)
        }
})

    function renderSingleMessage(messageReceiver, messageSender, messageBody) {
        return (
            <Container fluid="lg" className="chats">
                    <Row>
                        <Col>{messageBody}</Col>
                    </Row>
            </Container>
        )
    }

    return (
        <div>
            <h1>
                {messageReceiver}
            </h1>
            <div>
                {singleMessage}
            </div>
            <MessageForm/>
        </div>

    )
}
export default Chats;