import axios from "axios";

const API_BASE_URL ='http://localhost:8080/api/v1';

export const filesAPI ={
    uploadEventImage: async (file) =>{
        const formData =new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('authToken');

        const response = await axios.post(
            `${API_BASE_URL}/files/upload/event-images`,
            formData,
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    },
};

