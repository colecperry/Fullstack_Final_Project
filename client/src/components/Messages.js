import React from 'react'
import Chats from "./Chats"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/App.css"
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { allMessagesState, userState } from '../recoil/atoms';

function Messages() {
    const navigate = useNavigate()
    const allMessages = useRecoilValue(allMessagesState)
    const user = useRecoilValue(userState)
    const user_id = user.id
    // console.log(allMessages)

    const messageComponents = allMessages.map((message) => {
        const messageBody = message.message_body
        const messageReceiver = message.receiving_user?.user_name
        // console.log(messageReceiver)

        if (user_id === message?.sending_user?.id && messageReceiver) {
            // console.log(messageReceiver)
            return renderMessageBox(messageReceiver, messageBody)
        }
        return null;
    })

    function renderMessageBox (messageReceiver, messageBody) {
        return (
            <Container fluid="lg" className="messages" onClick={() => navigate("/chats")}>
                <Row>
                    <Col><b>{messageReceiver}</b></Col>
                </Row>
                <Row>
                    <Col>{messageBody}</Col>
                </Row>
            </Container>
    )}


    return (
        <div>
            <h1>
            Hello from Messages
            </h1>
            {messageComponents}
        </div>
    )
}
export default Messages;