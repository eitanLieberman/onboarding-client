import "./App.css";
import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Navigate,
  Link,
  Routes,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import "./App.css";
import { useSelector } from "react-redux";
import Patients from "./pages/Patients";
const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={!user ? <Homepage /> : <Navigate to="/patients" />}
          exact
        />
        <Route
          path="/patients"
          element={user ? <Patients /> : <Navigate to="/" />}
          exact
        />
      </Routes>
    </div>
  );
};

export default App;
