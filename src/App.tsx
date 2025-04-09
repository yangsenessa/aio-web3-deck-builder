import { Routes, Route } from "react-router-dom";
import React from "react"; // Import React explicitly
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  // Remove all providers one by one to find which one is causing the issue
  <>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
