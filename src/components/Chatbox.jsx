import React, { useState, useEffect, useRef } from 'react';
import chatboxIcon from '../images/chatbox-icon.svg'; // Import the image
import './Style.css';

function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesContainerRef = useRef(null);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (inputText === '') {
      return;
    }

    const userMessage = { name: 'User', message: inputText };

    fetch('http://127.0.0.1:5002/predict', {
      method: 'POST',
      body: JSON.stringify({ message: inputText }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        const samMessage = { name: 'Sam', message: response.answer };
        setMessages([...messages, userMessage, samMessage]);
        setInputText('');
      })
      .catch(error => {
        console.error('Error:', error);
        setInputText('');
      });
  };

  const handleInputChange = event => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const renderMessages = () => {
    const reversedMessages = [...messages].reverse();
    return reversedMessages.map((message, index) => (
      <div
        key={index}
        className={`messages__item ${
          message.name === 'Sam'
            ? 'messages__item--visitor'
            : 'messages__item--operator'
        }`}
      >
        {message.message}
      </div>
    ));
  };

  return (
    <>
      {isOpen ? (
        <div className={`chatbox`}>
          <div className="chatbox__support">
            <div className="chatbox__header">
              <div className="chatbox__image--header">
                <img
                  src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                  alt=""
                />
              </div>
              <div className="chatbox__content--header">
                <h4 className="chatbox__heading--header">Chat support</h4>
                <p className="chatbox__description--header">
                  Hi there, How can I help you?
                </p>
              </div>
            </div>
            <div className="chatbox__messages" ref={messagesContainerRef}>
              {renderMessages()}
            </div>
            <div className="chatbox__footer">
              <input
                type="text"
                placeholder="Write a message..."
                value={inputText}
                onChange={handleInputChange}
                onKeyUp={e => e.key === 'Enter' && handleSend()}
              />
              <button
                className="chatbox__send--footer send__button"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="chatbox__button">
        <button onClick={toggleChatbox}>
          <img src={chatboxIcon} alt="Chatbox Icon" />
        </button>
      </div>
    </>
  );
}

export default Chatbox;
