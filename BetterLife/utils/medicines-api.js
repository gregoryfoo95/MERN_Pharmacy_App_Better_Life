import sendRequest from './send-request';

const BASE_URL = '/api/medicine';

export const medicinesAPI = {
    getAll: async function() {
        try {
            const response = await sendRequest(BASE_URL);
            return response;
        } catch (error) {
            throw new Error('Could not get medicines.');
        }
    }
}
