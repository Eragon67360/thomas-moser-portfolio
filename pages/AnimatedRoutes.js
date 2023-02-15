import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Project1 from "./projects/project1";
import Home from "./home";
import { AnimatePresence } from "framer-motion";


function AnimatedRoutes() {
    const location = useLocation();
  
    return (
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/project1" element={<Project1 />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AnimatePresence>
    );
  }
  
  export default AnimatedRoutes;