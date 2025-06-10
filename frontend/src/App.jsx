import React, { createContext, useState, useContext, use } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Category from "./pages/Category";
import Budget from "./pages/Budget";
import Icon from "./pages/Icon";
import Transaction from "./pages/Transaction";
import Chart from "./component/Chart";

export const ThemeContext = createContext(null);
function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="setting" element={<Setting />} />
        <Route path="category" element={<Category />} />
        <Route path="icon" element={<Icon />} />
        <Route path="budget" element={<Budget />} />
        <Route path="chart" element={<Chart />} />
        <Route path="transaction" element={<Transaction />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}
function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        <Router>
          <AppContent />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
