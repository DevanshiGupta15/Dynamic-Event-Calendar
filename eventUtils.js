export const eventUtils = {
  getEvents: () => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  },

  saveEvent: (event) => {
    const events = eventUtils.getEvents();
    localStorage.setItem("events", JSON.stringify([...events, event]));
  },

  filterEvents: (keyword) => {
    const events = eventUtils.getEvents();
    return events.filter((event) =>
      event.title.toLowerCase().includes(keyword.toLowerCase())
    );
  },
};
