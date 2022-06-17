import React, { useState } from "react";
import "./Contact.css";
import { gql, useMutation } from "@apollo/client";

const ADD_MESSAGE = gql`
  mutation ($name: String!, $email: String!, $message: String!) {
    sendMessage(name: $name, email: $email, message: $message) {
      Name
      Email
      Message
    }
  }
`;

function Contact({ showContactForm, setLoadContactForm }) {
  const [message, setMessage] = useState({
    Name: "",
    Email: "",
    Message: "",
  });
  const [sendMessage, { data }] = useMutation(ADD_MESSAGE);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({
      variables: {
        name: message.Name,
        email: message.Email,
        message: message.Message,
      },
    });
    setLoadContactForm(false);
    setMessage({
      Name: "",
      Email: "",
      Message: "",
    });
  };
  return (
    <div
      id="contact"
      style={showContactForm === false ? { display: "none" } : null}
    >
      <button
        id="closeButton"
        onClick={() => {
          setMessage({
            Name: "",
            Email: "",
            Message: "",
          });
          setLoadContactForm(false);
        }}
      >
        X
      </button>
      <p id="contactHeading">Contact</p>
      <p id="contactSubHeading">
        Lorem Ipsum is simply dummy text of the printing
      </p>
      <form id="contactForm" onSubmit={handleSubmit}>
        <div className="formElements">
          <label>Name</label>
          <input
            type="text"
            name="Name"
            id="Name"
            placeholder="Enter your name here"
            value={message.Name}
            onChange={(text) => {
              setMessage((details) => ({
                ...details,
                Name: text.target.value,
              }));
            }}
          />
        </div>
        <div className="formElements">
          <label>E-mail</label>
          <input
            type="email"
            name="Email"
            id="Email"
            placeholder="Enter your e-mail address here"
            value={message.Email}
            onChange={(text) => {
              setMessage((details) => ({
                ...details,
                Email: text.target.value,
              }));
            }}
          />
        </div>
        <div className="formElements">
          <label>Message</label>
          <input
            type="text"
            name="Name"
            id="Name"
            placeholder="Wanna share something with us?"
            value={message.Message}
            onChange={(text) => {
              setMessage((details) => ({
                ...details,
                Message: text.target.value,
              }));
            }}
          />
        </div>
        <button type="submit" id="submitButton" style={{cursor: 'pointer'}}>
          Submit
        </button>
      </form>
      <div id="contactInfo">
        <span id="contactWebsite">Need more info? hello@newzera.com</span>
        <span id="socialMediaIconsContainer2">
          <img
            alt="FacebookIcon"
            className="socialMediaIcons"
            src={require("./assets/Images/FB-icon-black@2x.png")}
          />
          <img
            alt="LinkedinIcon"
            className="socialMediaIcons"
            src={require("./assets/Images/linkedin-icon-black@2x.png")}
          />
          <img
            alt="TwitterIcon"
            className="socialMediaIcons"
            src={require("./assets/Images/Twitter-icon-black@2x.png")}
          />
        </span>
      </div>
    </div>
  );
}

export default Contact;
