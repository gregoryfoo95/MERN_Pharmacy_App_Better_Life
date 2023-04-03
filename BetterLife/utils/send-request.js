/* // Add the following import
import { getToken } from './users-service';
 */
export default async function sendRequest(url, method = 'GET', payload = null) {
    const options = { method };
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }

    const res = await fetch(url, options);
    
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error('Bad Request');
  }
    /*   // Add the below code
    const token = getToken();
    if (token) {
        // Ensure the headers object exists
        options.headers = options.headers || {};
        // Add token to an Authorization header
        // Prefacing with 'Bearer' is recommended in the HTTP specification
        options.headers.Authorization = `Bearer ${token}`; */
    }
