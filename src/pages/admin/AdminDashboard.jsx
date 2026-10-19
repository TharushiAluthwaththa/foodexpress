import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    customers: 0,
    orders: 0,
    restaurants: 0,
    hotels: 0,
    revenue: 0,
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("admin_token");

      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setStats(
        response.data.stats || {
          customers: 0,
          orders: 0,
          restaurants: 0,
          hotels: 0,
          revenue: 0,
        }
      );

      setOrders(response.data.recent_orders || []);
    } catch (error) {
      console.error(
        "Dashboard error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      icon: "👥",
      title: "Customers",
      value: stats.customers,
      change: "Registered customers",
    },
    {
      icon: "🛒",
      title: "Orders",
      value: stats.orders,
      change: "Total orders",
    },
    {
      icon: "🍽️",
      title: "Restaurants",
      value: stats.restaurants,
      change: "Available restaurants",
    },
    {
      icon: "🏨",
      title: "Hotels",
      value: stats.hotels,
      change: "Available hotels",
    },
    {
      icon: "💰",
      title: "Revenue",
      value: `Rs. ${Number(stats.revenue || 0).toLocaleString()}`,
      change: "Total revenue",
    },
  ];

  if (loading) {
    return (
      <div className="admin-loading">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* PAGE HEADER */}
      <div className="admin-page-title dashboard-page-header">
        <div>
          <h1>Dashboard Overview</h1>

          <p>
            Monitor your FoodExpress business from here.
          </p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="dashboard-cards">

        {cards.map((card) => (
          <div
            className="dashboard-card"
            key={card.title}
          >
            <div className="dashboard-card-content">

              <h6>{card.title}</h6>

              <h2>{card.value}</h2>

              <p>{card.change}</p>

            </div>

            <div className="dashboard-card-icon">
              {card.icon}
            </div>
          </div>
        ))}

      </div>

      {/* DASHBOARD CONTENT */}
      <div className="dashboard-grid">

        {/* RECENT ORDERS */}
        <div className="admin-panel dashboard-orders-panel">

          <div className="admin-panel-header">

            <h3>Recent Orders</h3>

            <button
              type="button"
              className="admin-link-button"
              onClick={() => navigate("/admin/orders")}
            >
              View All →
            </button>

          </div>

          {orders.length === 0 ? (
            <div className="empty-admin-data">
              No orders found.
            </div>
          ) : (
            <div className="dashboard-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>ORDER</th>
                    <th>CUSTOMER</th>
                    <th>RESTAURANT</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>

                  {orders.map((order) => (
                    <tr key={order.id}>

                      <td>
                        <strong>
                          #{order.id}
                        </strong>
                      </td>

                      <td>
                        {order.user?.name ||
                          order.customer_name ||
                          "Unknown"}
                      </td>

                      <td>
                        {order.restaurant?.name || "-"}
                      </td>

                      <td>
                        <strong>
                          Rs.{" "}
                          {Number(
                            order.total_amount || 0
                          ).toLocaleString()}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`status ${
                            order.status?.toLowerCase() ===
                            "completed"
                              ? "completed"
                              : order.status?.toLowerCase() ===
                                "pending"
                              ? "pending"
                              : "processing"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* QUICK ACTIONS */}
        <div className="admin-panel dashboard-quick-panel">

          <div className="admin-panel-header">
            <h3>Quick Actions</h3>
          </div>

          <div className="quick-actions">

            <button
              className="quick-action-btn primary"
              onClick={() =>
                navigate("/admin/restaurants")
              }
            >
              <span>➕</span>
              <span>Add Restaurant</span>
            </button>

            <button
              className="quick-action-btn"
              onClick={() =>
                navigate("/admin/foods")
              }
            >
              <span>🍔</span>
              <span>Manage Foods</span>
            </button>

            <button
              className="quick-action-btn"
              onClick={() =>
                navigate("/admin/hotels")
              }
            >
              <span>🏨</span>
              <span>Manage Hotels</span>
            </button>

            <button
              className="quick-action-btn"
              onClick={() =>
                navigate("/admin/revenue")
              }
            >
              <span>📊</span>
              <span>View Revenue</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;