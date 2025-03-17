import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"; // Added Router import
import { auth } from "./Firebase"; // Import Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Dash from "./Dash";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="*" element={user ? <Dash roll="524170@student.nitandhra.ac.in"/> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
