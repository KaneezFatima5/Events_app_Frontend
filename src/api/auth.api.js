import apiClient from "./axios.config";

export const authAPI= {
    login: (credentials) => apiClient.post('/auth/login', credentials),
    registerAttendee: (data) => apiClient.post('/auth/register/attendee', data),
    registerOrganizer: (data) => apiClient.post('/auth/register/organizer', data),
};
