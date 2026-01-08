import apiClient from "./axios.config";

export const eventsAPI = {
    getAllEvents: (filters) => apiClient.get('/events', {params:filters}),
    getEventById: (id) => apiClient.get(`/events/${id}`),
    createEvent: (data) => apiClient.post('/events', data),
    updateEvent: (id, data) => apiClient.put(`/events/${id}`, data),
    deleteEvent: (id) => apiClient.delete(`/events/${id}`),
    getMyEvents: () => apiClient.get('/events/my-events'),
};

