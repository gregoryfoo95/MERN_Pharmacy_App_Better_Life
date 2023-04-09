import sendRequest from './send-request';

const BASE_URL = '/api/medicine';

export const medicinesAPI = {
    getAll: async function() {
        try {
            const response = await sendRequest("https://pharmacy-app.onrender.com/api/medicine");
            return response;
        } catch (error) {
            throw new Error('Could not get medicines.');
        }
    }
}
