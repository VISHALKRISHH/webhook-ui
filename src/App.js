import React, { useEffect, useState } from "react";

function App() {
   // State variables to store events, loading status, and errors
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Actual backend endpoint
  const apiUrl = "https://887b-103-130-204-44.ngrok-free.app/api/events"; 

  // useEffect to fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = () => {
      fetch(apiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        })
        .then(data => {
          console.log("Fetched Events:", data);
          setEvents(data.reverse());
          setLoading(false);
        })
        .catch(err => {
          console.error("Fetch error:", err);
          setError(err.message);
          setLoading(false);
        });
    };

    fetchEvents();

    // Refresh data every 15 seconds (polling)
    const interval = setInterval(fetchEvents, 15000);
    return () => clearInterval(interval);
  }, []);

  // Format ISO timestamp string to readable format
  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    const options = {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: 'numeric', minute: '2-digit',
      hour12: true, timeZone: 'UTC'
    };
    const formatted = date.toLocaleString('en-US', options);
    return `${formatted} UTC`;
  };

  // Format each message based on the `action` field
  const formatMessage = (event) => {
    const { author, action, from_branch, to_branch, timestamp } = event;
    const time = formatTimestamp(timestamp);

    switch (action) {
      case "PUSH":
        return `"${author}" pushed to "${to_branch}" on ${time}`;
      case "PULL REQUEST":
        return `"${author}" submitted a pull request from "${from_branch}" to "${to_branch}" on ${time}`;
      case "MERGE":
        return `"${author}" merged branch "${from_branch}" to "${to_branch}" on ${time}`;
      default:
        return "Unknown event type";
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📦 GitHub Webhook Events</h1>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          {events.length === 0 ? (
            <p>No events yet. Try pushing or opening a PR on GitHub.</p>
          ) : (
            <ul>
              {events.map((event, index) => (
                <li key={index}>{formatMessage(event)}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default App;
