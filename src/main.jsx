import React from "react";
import "../public/locales/i18n";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "./css/index.css";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster />
  </>
);
