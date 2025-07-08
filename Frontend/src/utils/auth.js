/**
 * Get the JWT token from localStorage
 * @returns {string|null} The JWT token or null if not found
 */
export const getToken = () => {
    return localStorage.getItem('token');
};

/**
 * Check if user is authenticated and token is valid
 * @returns {object|null} Decoded token if valid, null otherwise
 */
export const isAuthenticated = () => {
    try {
        const token = getToken();
        if (!token) return null;

        // Decode JWT token
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Check if token is expired
        if (payload.exp * 1000 <= Date.now()) {
            logout(); // Remove expired token
            return null;
        }

        return payload;
    } catch (error) {
        console.error('Error checking authentication:', error);
        logout(); // Remove invalid token
        return null;
    }
};

/**
 * Logout user by removing token from localStorage
 */
export const logout = () => {
    localStorage.removeItem('token');
};

/**
 * Store JWT token in localStorage
 * @param {string} token - The JWT token to store
 */
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

/**
 * Get authorization headers for API requests
 * @returns {object} Headers object with Authorization header
 */
export const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Check if token is expired
 * @returns {boolean} True if token is expired or invalid
 */
export const isTokenExpired = () => {
    try {
        const token = getToken();
        if (!token) return true;

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 <= Date.now();
    } catch (error) {
        return true;
    }
};
