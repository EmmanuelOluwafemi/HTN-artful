import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import InputEmoji from 'react-input-emoji'

import Pusher from "pusher-js";

import {Axios} from "../util/Axios"

const Chat = () => {
    const messageRef = useRef(null);
    const [enteredMessage, setEnteredMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        var pusher = new Pusher('96528d5a2403acffa87d', {
            cluster: 'eu'
        });
      
        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
          setMessages((prevState) => [...prevState, data.message])
        });

    }, [])

    const handleOnEnter = (e) => {
        setLoading(true)
        Axios.post('http://192.168.0.104:8000/chats', {"message": enteredMessage})
        .then(res => {
            // console.log(res)
            setLoading(false)
            setUpdate(!update)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })       
        
    }

    const scrollDown = () => {
        const element = messageRef.current;
        element.scrollTop = element.scrollHeight;
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        handleOnEnter()

        e.target.reset()
        scrollDown()
    }

    return (
        <StyledChat>
            <div ref={messageRef} className="chats">
                {
                    messages.length > 0 ? messages?.map((message, index) => (
                        <div key={index} className="chat">
                            <div className="chat-message">
                                {message}
                            </div>
                        </div>
                    )):
                    <div className="noMessage">No Messages at the moment</div>
                }
            </div>

            {
                loading ?
                <p className="typing">Typing....</p>:
                null
            }
            <form onSubmit={handleSubmit} className="message">
                {/* <input onChange={(e) => setEnteredMessage(e.target.value)} placeholder="Enter Message" name="message" type="text" /> */}
                <InputEmoji
                    value={enteredMessage}
                    onChange={setEnteredMessage}
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
        </StyledChat>
    )
}

export default Chat

const StyledChat = styled.div`
    width: 100%;
    display: flex;
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;


    .typing {
        font-size: .6rem;
    }

    .chats {
        flex-grow: 1;
        width: 100%;
        padding: 1rem;
        overflow-y: auto;

        .noMessage {
            font-size: 1rem;
            color: #1a1a1a;
            text-align: center;
        }

        .chat {
            margin-bottom: 1.3rem;
            display: flex;
            justify-content: flex-end;

            .chat-message {
                background-color: #fff;
                box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.3);
                border-radius: .9rem;
                border-bottom-right-radius: 0;
                padding: .6rem 1rem;
                display: inline-block;
                margin-left: auto;
            }
        }
    }

    .message {
        display: flex;
        align-items: center;
        background: #26A69A;
        padding: .5rem;
        
        input {
            flex-grow: 1;
            height: 3rem;
            background: #fff;
            outline: none;
            border: none;
            padding: 0 1rem;
            border-radius: .2rem;
        }

        button {
            height: 3rem;
            font-size: 1rem;
            outline: none;
            border: none;
            background: #26A69A;
            color: #fff;
            box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
            transition: all .3s ease-in-out;
            cursor: pointer;
            
            &:hover {
                box-shadow: 0px 0px 64px rgba(0, 0, 0, 0.3);
            }
        }
    }
`