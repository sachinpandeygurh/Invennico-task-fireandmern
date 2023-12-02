import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";


function App() {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    // const data = true
    return data;
  });
  const handleLogin = (data) => {
    setUser(data);
  };
  return (
    <>
      <Navbar data={user} />
      <Routes>
        <Route
          path="/dashboard"
          element={user ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            !user ? (
              <Login handleLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/profile"
          element={
            user ? <Profile handleLogin={handleLogin} /> : <Navigate to="/" />
          }
        />
       
      </Routes>
    </>
  );
}

export default App;
