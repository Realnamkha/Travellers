import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Layout.jsx";
import Login from "./admin/pages/Login.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// 👇 Import actual pages
import Home from "./pages/Home.jsx";
import Facilities from "./pages/Facilities.jsx";
import Contact from "./pages/Contact.jsx";
import Gallery from "./pages/Gallery.jsx";
import AdminDashboard from "./admin/pages/Dashboard.jsx";

// 👇 Create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="contact" element={<Contact />} />
        <Route path="gallery" element={<Gallery />} />
      </Route>
      // Admin routes/
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
