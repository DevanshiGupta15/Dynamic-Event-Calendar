import React, { useState } from "react";

const EventModal = ({ showModal, setShowModal }) => {
  const [eventDetails, setEventDetails] = useState("");

  // Event handling function to add event
  const handleEventChange = (e) => {
    setEventDetails(e.target.value);
  };

  const addEvent = () => {
    console.log("Event added:", eventDetails);
    // Handle adding event logic
    setEventDetails(""); // Clear after adding
    setShowModal(false); // Close modal after adding
  };

  if (!showModal) return null; // If showModal is false, return null (do not render modal)

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={() => setShowModal(false)}>
          &times;
        </span>
        <h2>Add Event</h2>
        <input
          type="text"
          value={eventDetails}
          onChange={handleEventChange}
          placeholder="Enter event details"
        />
        <button onClick={addEvent}>Add Event</button>
      </div>
    </div>
  );
};

export default EventModal;
