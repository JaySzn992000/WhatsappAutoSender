import React, { useState } from "react";
import axios from "axios";
import "./whapisender.css";

const API_URL = "https://gate.whapi.cloud/messages/text";
const TOKEN = "JJlkctcvmqirXyRVjgEIKDoJoM9gP28b"; 

function WhapiSender() {
  const [numbers, setNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [gap, setGap] = useState(30000); // default 30 sec

  const sendMessage = async (phone) => {
    try {
      await axios.post(
        API_URL,
        { to: phone, body: message },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(`Sent to ${phone}: ${message}`);
    } catch (err) {
      console.error(`Error sending to ${phone}`, err);
    }
  };

  const startSending = () => {
    const phoneList = numbers.split(",").map(num => num.trim());
    let delay = 0;

    phoneList.forEach(phone => {
      setTimeout(() => sendMessage(phone), delay);
      delay += gap; 
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>WhatsApp Auto Sender</h2>
      <textarea
        rows="3"
        cols="50"
        placeholder="Enter numbers separated by commas"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ display: "block", margin: "10px 0", width: "300px" }}
      />
      <input
        type="number"
        placeholder="Enter gap in ms (e.g. 60000 for 1 min)"
        value={gap}
        onChange={(e) => setGap(Number(e.target.value))}
        style={{ display: "block", margin: "10px 0", width: "300px" }}
      />
      <button onClick={startSending} style={{ marginTop: "10px" }}>
        Start Sending
      </button>
    </div>
  );
}

export default WhapiSender;
