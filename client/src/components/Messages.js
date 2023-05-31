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
    const breeder = useRecoilValue(breederState)
    const user_id = user.id;

    const breeder_name = breeder?.user_name
    const breeder_id = breeder.id

    const messages_for_curr_user = 
        allMessages.filter(
            (message) => (user_id === message.sending_user?.id)
        )

    console.log(messages_for_curr_user)
    

    let message_dict = {}
    let id_to_name = {}

    for (let i = 0; i < messages_for_curr_user.length; i++) {
        const message = messages_for_curr_user[i]
        const receiver_name = message.receiving_user?.user_name
        const receiverId = message.message_receiver_id

        if (receiverId in id_to_name) {
            delete id_to_name[receiverId];
        }
        id_to_name[receiverId] = receiver_name
        
        if (receiverId in message_dict) {
            delete message_dict[receiverId];
        }
        message_dict[receiverId] = message.message_body
    }
    console.log(message_dict)
    const message_dict_entries = Object.entries(message_dict)
    const message_box_components = message_dict_entries.map(
        ([key, value]) => {
            return renderMessageBox(key, id_to_name[key], value)
        }
    )

    // for (let i = allMessages.length - 1; i >= 0; i--) {
    //     const message = allMessages[i];
    //     const messageReceiver = message.receiving_user?.user_name;
    //     const messageBody = message.message_body;

    //     if (user_id === message?.sending_user?.id && messageReceiver) {
    //         mostRecentMessage = {
    //             receiver: messageReceiver,
    //             body: messageBody
    //         };
    //         break;
    //     }
    // }

    // if (!mostRecentMessage) {
    //     return null; // Return null if no recent message is found
    // }

    const display_message_form = breeder.id !== 0

    return (
        <div>
            <h1>Hello from Messages</h1>
            {display_message_form ? <MessageForm messageReceiverId={breeder_id}/> : <div></div>}
            {/* {renderMessageBox(mostRecentMessage.receiver, mostRecentMessage.body)} */}
            {message_box_components}
        </div>
    );

    function renderMessageBox(receiver_id, messageReceiver, messageBody) {
        console.log("receiver_id", receiver_id)
        console.log("messageReceiver", messageReceiver)
        return (
            <Container fluid="lg" className="messages" onClick={() => navigate(`/chats/${receiver_id}`)}>
                <Row>
                    <Col><b>{messageReceiver}</b></Col>
                </Row>
                <Row>
                    <Col>{messageBody}</Col>
                </Row>
            </Container>
        );
    }
}

export default Messages;