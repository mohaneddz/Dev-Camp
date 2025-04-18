import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSendMessage = async () => {
    if (userInput.trim() || selectedFile) {
      const newUserMessage = { text: userInput, sender: 'user' };
      setMessages([...messages, newUserMessage]);
      setUserInput(''); // Clear the input

      const responseData = await sendMessageToChatbot(userInput, selectedFile, '2');
      setSelectedFile(null); // Clear the file after sending

      if (responseData && responseData.answer) { // Assuming the answer is in a field called 'answer'
        const chatbotMessage = { text: responseData.answer, sender: 'chatbot' };
        setMessages([...messages, chatbotMessage]);
        // You might also process other parts of the response here (marketing tactics, etc.)
        if (responseData.marketing_recommendations) {
          console.log('Marketing:', responseData.marketing_recommendations);
          // Update UI to display these
        }
        if (responseData.inventory_advice) {
          console.log('Inventory:', responseData.inventory_advice);
          // Update UI to display this
        }
      } else {
        const errorMessage = { text: 'Error communicating with the chatbot.', sender: 'chatbot', isError: true };
        setMessages([...messages, errorMessage]);
      }
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-display">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender} ${msg.isError ? 'error' : ''}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask your question..."
        />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;