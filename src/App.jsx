import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"; // Added Router import
import { auth } from "./Firebase"; // Import Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Dash from "./Dash";

const App = () => {
  const [user, setUser] = useState(null);
  const [os, setOS] = useState("1");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setOS("ios");
    }

    return () => unsubscribe();
  }, []);

  if (os !== "ios") {
    return <div>Non-iOS devices are not supported</div>; // Optional: handle non-iOS case
  }

  return (
    <Router>
      <Routes>
        <Route path="*" element={user ? <Dash roll={user.email}/> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
