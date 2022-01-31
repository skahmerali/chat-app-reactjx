import React, { useState ,useEffect } from "react";
import { Button, Form, ListGroup } from './../react-bootstrap';
const axios = require('axios');
export default function Message() {
    const [text, setText] = useState("");
    const [message, setMessage] = useState([]);
    function sendMessage(e) {
        e.preventDefault();
        console.log("Text:", text);
        setMessage((prev) => {

            return [{ sender: "user", text: text }, ...prev]
        })
        axios.post("http://localhost:3000/chatApp", { text: text })
            .then((response) => {
                console.log(response)
                console.log(response.data)
                setMessage((prev) => {
                    return [{ sender:"bot", text: text }, ...prev,];

                });
                e.target.reset();
                setText("");
            }).catch(err => {
                console.log(err);
                setMessage((prev) => {
                    return [{ sender: "bot", text: "this is dummy text" }, ...prev];
                });
                e.target.reset();
                setText("");

            })
    } return (
        <>
            <div>

                <Form onSubmit={sendMessage}>
                    <Form.Group
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }} className="mb-3" controlId="formBasicEmail">

                        <Form.Control
                            onChange={(e) => { setText(e.target.value) }}
                            type="text"
                            placeholder="Enter your message"
                        />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form.Group>
                </Form>

                <br />
                <br />
                <br />

                <div style={{ display: "flex", flexDirection: "column" }}>

                    {message?.map((eachMessage, eachMessageIndex) => (
                        <div key={`${eachMessageIndex}-message`} style={{
                            display: "flex",
                            justifyContent: (eachMessage.sender === "user") ? "flex-end" : "flex-start"
                        }}>
                            <div>{eachMessage.text}</div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}