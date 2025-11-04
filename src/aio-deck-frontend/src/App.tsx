import { Routes, Route } from "react-router-dom";
import React from "react";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import AIOPage from "./pages/AIOPage";
import UnivoicePage from "./pages/UnivoicePage";
import PMugPage from "./pages/PMugPage";
import AboutAIO from "./pages/AboutAIO";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/aio" element={<MainLayout><AIOPage /></MainLayout>} />
      <Route path="/univoice" element={<MainLayout><UnivoicePage /></MainLayout>} />
      <Route path="/pmug" element={<MainLayout><PMugPage /></MainLayout>} />
      <Route path="/about" element={<MainLayout><AboutAIO /></MainLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster />
  </>
);

export default App;
