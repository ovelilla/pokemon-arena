// Vendors
import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
// Fonts
import "@fontsource/poppins";
// Layouts
import AppLayout from "@/layouts/app/app.layout";
// Pages
import SimulatorPage from "@/modules/simulator/simulator.page";
import TeamBuilderPage from "@/modules/team-builder/team-builder.page";
// Styles
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<TeamBuilderPage />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/simulator" element={<SimulatorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
