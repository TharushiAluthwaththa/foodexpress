import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/customer/Home";
import Restaurant from "./pages/customer/Restaurant";
import Hotels from "./pages/customer/Hotels";
import RestaurantMenu from "./pages/customer/RestaurantMenu";
import HotelMenu from "./pages/customer/HotelMenu";
import Login from "./pages/customer/Login";
import Register from "./pages/customer/Register";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import AdminHotels from "./pages/admin/AdminHotels";
import AdminFoods from "./pages/admin/AdminFoods";
import AdminRevenue from "./pages/admin/AdminRevenue";
import AdminSettings from "./pages/admin/AdminSettings";

import "./Admin.css";
import "./Customer.css";

function App() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}

      <Routes>

        {/* ================= CUSTOMER ================= */}

        <Route path="/" element={<Home />} />

        <Route
          path="/restaurants"
          element={<Restaurant />}
        />

        <Route
          path="/hotels"
          element={<Hotels />}
        />

        <Route
          path="/restaurants/:id"
          element={<RestaurantMenu />}
        />

        <Route
          path="/hotels/:id"
          element={<HotelMenu />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute type="customer">
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute type="customer">
              <Orders />
            </ProtectedRoute>
          }
        />


        {/* ================= ADMIN LOGIN ================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ================= ADMIN PANEL ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute type="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={
              <Navigate
                to="/admin/AdminDashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="customers"
            element={<AdminCustomers />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          <Route
            path="restaurants"
            element={<AdminRestaurants />}
          />

          <Route
            path="hotels"
            element={<AdminHotels />}
          />

          <Route
            path="foods"
            element={<AdminFoods />}
          />

          <Route
            path="revenue"
            element={<AdminRevenue />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />

        </Route>

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

export default App;