import axios from 'axios';

const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:3000';

/**
 * Submits the contact form to the backend endpoint.
 * @param {Object} formData - The contact details: { name, email, phone, message }
 * @returns {Promise<Object>} The server response data.
 */
export const submitContactForm = async (formData) => {
    // Ensure BACKEND_URL does not end with a slash, then append /contact/
    const baseUrl = BACKEND_URL.replace(/\/$/, '');
    const endpoint = `${baseUrl}/contact/`;

    const response = await axios.post(endpoint, formData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.data;
};
