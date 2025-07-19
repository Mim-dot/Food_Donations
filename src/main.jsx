import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Router/router";
import { RouterProvider } from "react-router";
import AuthProvider from "./LayOut/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from 'aos';
import { ToastContainer } from "react-toastify";
Aos.init();
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
        <AuthProvider>
      {" "}
      <RouterProvider router={router} />
       <ToastContainer position="top-center" autoClose={3000} />
    </AuthProvider>
     </QueryClientProvider>
  
  </StrictMode>
);
