import React, { useState } from "react";

const GenerateLink = () => {
  const [link, setLink] = useState("");

  const generateLink = () => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("Please log in first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (!user.userId) {
      alert("User ID not found.");
      return;
    }

    const generatedLink =
      `https://ngilo.app/message/${user.userId}`;

    setLink(generatedLink);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    alert("Link copied!");
  };

  return (
    <div className="ngilo-user">
      <div className="user-login">

        <h2>Your Ngilo Link</h2>

        <p>
          Share your link and receive anonymous messages.
        </p>

        <button onClick={generateLink}>
          Generate My Link
        </button>

        {link && (
          <>
            <input
              type="text"
              value={link}
              readOnly
              style={{
                width: "100%",
                marginTop: "20px",
              }}
            />

            <button onClick={copyLink}>
              Copy Link
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default GenerateLink;