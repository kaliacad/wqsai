import React from "react";
import "../public/locales/i18n";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import {TextProvider} from "./providers/text-provider.jsx";
import "./css/index.css";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TextProvider>
    <App />
    <Toaster />
  </TextProvider>
);
