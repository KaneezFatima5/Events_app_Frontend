const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const calendarAPI = {
  downloadEventCalendar: (eventId) => {
    const url = `${API_BASE_URL.replace('/api/v1', '')}/api/v1/calendar/events/${eventId}`;
    window.open(url, '_blank');
  },
};