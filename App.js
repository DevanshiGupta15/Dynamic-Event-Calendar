import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { saveAs } from "file-saver";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import "./calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = momentLocalizer(moment);

const defaultEvents = JSON.parse(localStorage.getItem("events")) || [
  {
    title: "Team Meeting",
    start: new Date(2024, 8, 30, 10, 0),
    end: new Date(2024, 8, 30, 11, 0),
    category: "Work",
  },
  {
    title: "React Workshop",
    start: new Date(2024, 9, 1, 14, 0),
    end: new Date(2024, 9, 1, 16, 0),
    category: "Personal",
  },
];

export default function App() {
  const [eventsList, setEventsList] = useState(defaultEvents);
  const [isOriginalCalendarVisible, setIsOriginalCalendarVisible] =
    useState(false);
  const [calendarToggleText, setCalendarToggleText] = useState(
    "View Original Calendar"
  );
  const [activeDate, setActiveDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("dark-mode") === "enabled"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentDateTime(
        `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
      );
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Effect to update body class on theme change
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handleSlotSelection = ({ start, end }) => {
    const eventTitle = prompt("Please enter the title of your event:");
    if (eventTitle) {
      const eventCategory = prompt(
        "Which category does your event belong to? (e.g., Work, Personal)"
      );
      const newEvent = {
        start,
        end,
        title: eventTitle,
        category: eventCategory,
      };
      const updatedEventsList = [...eventsList, newEvent];
      setEventsList(updatedEventsList);
      localStorage.setItem("events", JSON.stringify(updatedEventsList));
    }
  };

  const filteredEvents = eventsList.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCalendarVisibility = () => {
    setIsOriginalCalendarVisible(!isOriginalCalendarVisible);
    setCalendarToggleText(
      isOriginalCalendarVisible ? "View Original Calendar" : "Hide the Calendar"
    );
  };

  const exportEventsToJson = () => {
    const blob = new Blob([JSON.stringify(filteredEvents, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "events.json");
  };

  const exportEventsToCsv = () => {
    const header = ["Title", "Start", "End", "Category"];
    const rows = filteredEvents.map((event) => [
      event.title,
      event.start.toString(),
      event.end.toString(),
      event.category,
    ]);
    const csvContent = `data:text/csv;charset=utf-8,${header.join(",")}\n${rows
      .map((e) => e.join(","))
      .join("\n")}`;

    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "events.csv");
  };

  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("dark-mode", newMode ? "enabled" : "disabled");
  };

  return (
    <div className="container">
      <h1 className="dynamic-heading">Dynamic Event Calendar</h1>

      {/* Display Current Date and Time */}
      <div className="current-time">
        <h3>{currentDateTime}</h3>
      </div>

      <div className="create-event-section">
        <h3>Create or Add an Event</h3>
        <p>Click on a date to add a new event to your calendar.</p>
        <input
          type="text"
          placeholder="Search Events..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80%" }}
          selectable
          onSelectSlot={handleSlotSelection}
          onSelectEvent={(event) => setActiveDate(event.start)}
          views={["month", "week", "day"]}
        />
      </div>

      <button className="toggle-btn" onClick={toggleCalendarVisibility}>
        {calendarToggleText}
      </button>

      <div className="event-actions">
        <button onClick={exportEventsToJson}>Export as JSON</button>
        <button onClick={exportEventsToCsv}>Export as CSV</button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={handleThemeToggle}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {/* Modal or Side Panel for Event Details */}
      {activeDate && (
        <div className="side-panel">
          <h2>Events for {activeDate.toDateString()}</h2>
          {filteredEvents
            .filter(
              (event) =>
                event.start.toDateString() === activeDate.toDateString()
            )
            .map((event) => (
              <div key={event.title} className={`event ${event.category}`}>
                <strong>{event.title}</strong>
                <p>{event.category}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
