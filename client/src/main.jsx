import React from "react";
import ReactDOM from "react-dom/client";
import dotenv from "dotenv";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "./context/AuthProvider.jsx";
import ContextProvider from "./context/ContextProvider.jsx";
const queryClient = new QueryClient();
// dotenv.config();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>
);
