import React, { useState } from "react";

function Message() {
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    setStatus("");

    // Kunin ang userId mula sa link
    const parts = link.trim().split("/message/");
    const recipientId = parts[1];

    if (!recipientId) {
      setStatus("Please paste a valid Ngilo link.");
      return;
    }

    if (!message.trim()) {
      setStatus("Please write a message.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/send-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipientId: recipientId,
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setStatus(
          data.message || "Failed to send message."
        );
        return;
      }

      setStatus("Message sent anonymously! 💌");

      setMessage("");

    } catch (error) {
      console.error("Send error:", error);

      setStatus(
        "Cannot connect to server. Make sure backend is running on port 3001."
      );
    }
  };

  return (
    <div className="ngilo-message-page">

      <div className="ngilo-message-card">

        <div className="message-header">
          <div className="ngilo-avatar">
            💌
          </div>

          <h1>Send an anonymous message</h1>

          <p>
            Paste their Ngilo link below.
          </p>
        </div>

        <form onSubmit={handleSend}>

          {/* LINK */}
          <label>
            Ngilo Link
          </label>

          <input
            type="text"
            placeholder="Paste Ngilo link here..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          {/* MESSAGE */}
          <label>
            Anonymous Message
          </label>

          <textarea
            placeholder="Write your anonymous message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            maxLength={500}
          />

          <div className="message-counter">
            {message.length}/500
          </div>

          <button
            type="submit"
            className="send-message-button"
          >
            Send anonymously
          </button>

          {status && (
            <p className="message-status">
              {status}
            </p>
          )}

        </form>

      </div>

    </div>
  );
}

export default Message;