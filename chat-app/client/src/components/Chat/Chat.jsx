import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/reducers/users";
import { addMessage } from "../../redux/reducers/messages";

import { InfoBar, Messages, Input, TextContainer } from "..";

import "./Chat.css";

let socket;

const Chat = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join", { name: user.name, room: user.room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      dispatch(addMessage(message));
    });

    socket.on("roomData", ({ users }) => {
      dispatch(setUsers(users));
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar />
        <Messages />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer />
    </div>
  );
};

export default Chat;
