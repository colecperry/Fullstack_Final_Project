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
    console.log("breeder", breeder)
    const user_id = user.id;

    const breeder_name = breeder?.user_name
    const breeder_id = breeder.id
    console.log("breeder_id", breeder_id)

    const messages_for_curr_user = 
        allMessages.filter(
            (message) => (user_id === message.sending_user?.id)
        )
    

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

    const display_message_form = breeder_id !== 0

    return (
        <div>
            <h1 style={{fontFamily: 'Verdana, sans-serif', marginBottom: "10px"}}>Messages</h1>
            {display_message_form ? <MessageForm messageReceiverId={breeder_id}/> : <div></div>}
            {/* {renderMessageBox(mostRecentMessage.receiver, mostRecentMessage.body)} */}
            {message_box_components}
        </div>
    );

    function renderMessageBox(receiver_id, messageReceiver, messageBody) {
        return (
            <div className="ui huge message" style={{ 
                maxWidth: "1200px",
                margin: "0 auto", 
                display: "flex", 
                justifyContent: "flex-start", 
                alignItems: "flex-start",
                flexDirection: "row",
                marginBottom: "10px",
                marginTop: "10px"
                
                }} onClick={() => navigate(`/chats/${receiver_id}`)}>
                    <img className="circular-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC" alt="Profile" style={{ borderRadius: "50%", marginRight: "30px", width: "85px", height: "85px" }} />
                    <div>
                    <h2 style={{ fontSize: "30px", textAlign: "left" }}>{messageReceiver}</h2>
                    <p style={{ fontSize: "22px", textAlign: "left"}} >{messageBody}</p>
                    </div>
            </div>
        );
    }
}

export default Messages;
