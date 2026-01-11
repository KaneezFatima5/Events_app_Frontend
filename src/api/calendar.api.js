export const calendarAPI = {
  downloadEventCalendar: (eventId) => {
    const url = `http://localhost:8080/api/v1/calendar/events/${eventId}`;
    window.open(url, '_blank');
  },
};