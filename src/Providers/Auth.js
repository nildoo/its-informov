import React, { useState } from 'react';

export const AuthContext = React.createContext({});

export const AuthProvider = props => {
  const [user, setUser] = useState({
    access_token: null,
    IDPRJ: null,
    info: {
      documents: null,
      photos: null,
      email: null,
      details: {},
      attentionPoints: [],
      schedules: [],
      summarys: { total: null, data: [] },
      meeting: [],
      projects: [],
      notifications: {
        chat: [],
        pointsAttention: [],
        photos: [],
        archives: [],
      },
    },
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
