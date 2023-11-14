import React from 'react';

export const AuthContext = React.createContext({});

function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState('');

  const login = () => {
    setIsLoggedIn(true);
    setUser('Henry.P@fueled.com');
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUser('');
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn,
        login,
        logout,
        user
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
