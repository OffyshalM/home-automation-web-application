import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Dynamic imports for code-splitting
const Home = lazy(() => import("./pages/Home.jsx"));
const GetQuote = lazy(() => import("./pages/GetQuote.jsx"));
const ProductCatalog = lazy(() => import("./pages/ProductCatalog.jsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));

// Static import for lightweight wrapper components
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Lightweight loading component for smooth route transitions
const PageLoader = () => (
  <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center overflow-x-clip">
    <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/quote/:productId" element={<GetQuote />} />
        <Route path="/quote" element={<GetQuote />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;