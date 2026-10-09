import React, { useEffect, useState } from "react";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      try {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
          setError("Please log in first.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(savedUser);

        if (!user.userId) {
          setError("User ID not found.");
          setLoading(false);
          return;
        }

        console.log("Getting messages for:", user.userId);

        const response = await fetch(
          `http://localhost:3001/api/messages/${user.userId}`
        );

        const data = await response.json();

        console.log("Inbox response:", data);

        if (!response.ok) {
          setError(
            data.message || "Failed to get messages."
          );
          return;
        }

        setMessages(data);

      } catch (err) {
        console.error("Inbox error:", err);
        setError(
          "Cannot connect to backend on port 3001."
        );
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  if (loading) {
    return (
      <div className="ngilo-user">
        <div className="user-login">
          <h2>Loading Inbox...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="ngilo-user">
      <div className="user-login">

        <h2>📥 Inbox</h2>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {!error && messages.length === 0 && (
          <p>
            No anonymous messages yet.
          </p>
        )}

        {messages.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#f5f3ff",
              padding: "15px",
              marginTop: "12px",
              borderRadius: "12px",
              textAlign: "left",
            }}
          >
            <p style={{ margin: 0 }}>
              {item.message}
            </p>

            <small
              style={{
                color: "#888",
              }}
            >
              Anonymous • {item.timestamp}
            </small>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Inbox;