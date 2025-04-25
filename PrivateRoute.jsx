import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
      const Navigate = useNavigate();
    

  return (
    <div>
          return token ? children : <Navigate to="/connexion" />;

    </div>
  )
}
