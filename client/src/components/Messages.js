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
    console.log(allMessages)

    function renderMessageBox (breeder, messageBody) {
        return (
            <Container fluid="lg" className="messages" onClick={() => navigate("/chats")}>
                <Row>
                    <Col><b>{breeder}</b></Col>
                </Row>
                <Row>
                    <Col>{messageBody}</Col>
                </Row>
            </Container>
    )}

    const messageComponents = allMessages.map((message) => {
        const messageBody = message.message_body
        const messageReceiver = message.dog.user.user_name

        if (user_id === message.user.id) {
        return renderMessageBox(messageReceiver, messageBody)}
        

    })

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