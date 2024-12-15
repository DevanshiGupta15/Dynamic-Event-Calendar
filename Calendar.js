import React, { useState, useEffect } from "react";
import "./calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  // Function to generate calendar days
  const generateCalendar = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const days = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    setDaysInMonth(days);
  };

  const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState([]);

    useEffect(() => {
      const month = currentDate.getMonth(); // Get the current month
      const year = currentDate.getFullYear(); // Get the current year

      const days = getDaysInMonth(year, month); // Get the number of days in the current month
      setDaysInMonth(days);
    }, [currentDate]);

    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate(); // Return the last day of the given month
    };

    return (
      <div>
        <h1>Calendar</h1>
        {/* Display the calendar days here */}
      </div>
    );
  };

  // Update the calendar when the date changes
  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  return (
    <div>
      <h1>Calendar</h1>
      <div className="calendar">
        {daysInMonth.map((day, index) => (
          <div key={index} className="day">
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};
const [showModal, setShowModal] = useState(false);

// On date click, show modal
const handleDateClick = (date) => {
  setSelectedDate(date);
  setShowModal(true);
};

export default Calendar;
