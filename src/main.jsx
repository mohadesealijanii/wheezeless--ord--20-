import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import "primereact/resources/themes/lara-light-blue/theme.css" // تم زیبای PrimeReact ✨
import "primereact/resources/primereact.min.css" // استایل‌های پایه PrimeReact
// import "primeicons/primeicons.css"      

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

