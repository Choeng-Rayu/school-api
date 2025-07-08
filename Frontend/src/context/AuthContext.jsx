import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing token on mount
    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    // Decode JWT token to get user info
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    
                    // Check if token is expired
                    if (payload.exp * 1000 > Date.now()) {
                        setAuth({
                            token,
                            user: {
                                id: payload.id,
                                email: payload.email
                            }
                        });
                    } else {
                        // Token expired, remove it
                        localStorage.removeItem('token');
                    }
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        setAuth({ token, user });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(null);
    };

    const value = {
        auth,
        setAuth,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
