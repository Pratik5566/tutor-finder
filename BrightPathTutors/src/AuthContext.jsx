import React, { useState, useEffect, useContext } from 'react';

// Create AuthContext
const AuthContext = React.createContext();

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component
export function AuthProvider({ children }) {
  // State for authentication
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check if user is logged in
  const checkIsLoggedIn = () => {
    const storedUser = localStorage.getItem('authUser');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedUser && storedIsLoggedIn) {
      setAuthUser(JSON.parse(storedUser));
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
  };

  // Check if user is logged in on component mount
  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  // Function to handle login
  const login = (user) => {
    localStorage.setItem('authUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    setAuthUser(user);
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('isLoggedIn');
    setAuthUser(null);
    setIsLoggedIn(false);
  };

  // Determine user type based on authUser object
  const isUser = authUser && !authUser.isAdmin && !authUser.isTutor;
  const isTutor = authUser && authUser.isTutor;
  const isAdmin = authUser && authUser.isAdmin;

  // Value to be provided by AuthContext
  const value = {
    authUser,
    login,
    logout,
    isLoggedIn,
    isUser,
    isTutor,
    isAdmin,
  };

  // Return AuthContext.Provider with value and children
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
