import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminRevenue() {
  const [summary, setSummary] = useState({
    total_revenue: 0,
    total_orders: 0,
    completed_orders: 0,
    pending_orders: 0,
    cancelled_orders: 0,
  });

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("admin_token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://10.0.2.2:8000/api/admin/revenue",
        config
      );

      setSummary(response.data.summary || {});
      setMonthlyRevenue(response.data.monthly_revenue || []);
      setRecentOrders(response.data.recent_orders || []);
    } catch (error) {
      console.error(
        "Revenue error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load revenue data."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (amount) => {
    return `Rs. ${Number(amount || 0).toLocaleString(
      "en-LK",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const formatMonth = (year, month) => {
    const date = new Date(year, month - 1);

    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border"></div>
        <p className="mt-3">Loading revenue...</p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="admin-page-heading">
        <div>
          <h1 className="dashboard-title">
            Revenue
          </h1>

          <p className="dashboard-subtitle">
            Track FoodExpress revenue and completed orders
          </p>
        </div>

        <button
          className="btn btn-outline-primary"
          onClick={fetchRevenue}
        >
          â†» Refresh
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">

        <div className="col-md-4 col-lg-3">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              ðŸ’°
            </div>

            <div>
              <p>Total Revenue</p>

              <h2>
                {formatMoney(summary.total_revenue)}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              ðŸ“¦
            </div>

            <div>
              <p>Total Orders</p>

              <h2>
                {summary.total_orders || 0}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              âœ…
            </div>

            <div>
              <p>Completed Orders</p>

              <h2>
                {summary.completed_orders || 0}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              â³
            </div>

            <div>
              <p>Pending Orders</p>

              <h2>
                {summary.pending_orders || 0}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* SECOND ROW */}
      <div className="row g-4">

        {/* MONTHLY REVENUE */}
        <div className="col-lg-7">
          <div className="admin-panel">

            <div className="admin-panel-header">
              <div>
                <h3>
                  Monthly Revenue
                </h3>

                <p>
                  Revenue from completed orders
                </p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Month</th>
                    <th>Revenue</th>
                  </tr>
                </thead>

                <tbody>
                  {monthlyRevenue.length === 0 ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-4"
                      >
                        No revenue data available.
                      </td>
                    </tr>
                  ) : (
                    monthlyRevenue.map(
                      (item, index) => (
                        <tr
                          key={`${item.year}-${item.month}`}
                        >
                          <td>
                            {index + 1}
                          </td>

                          <td>
                            <strong>
                              {formatMonth(
                                item.year,
                                item.month
                              )}
                            </strong>
                          </td>

                          <td>
                            <strong>
                              {formatMoney(
                                item.revenue
                              )}
                            </strong>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>

        {/* ORDER STATUS */}
        <div className="col-lg-5">
          <div className="admin-panel">

            <div className="admin-panel-header">
              <div>
                <h3>
                  Order Summary
                </h3>

                <p>
                  Current order status
                </p>
              </div>
            </div>

            <div className="p-3">

              <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                <span>
                  Total Orders
                </span>

                <strong>
                  {summary.total_orders || 0}
                </strong>
              </div>

              <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                <span>
                  Completed
                </span>

                <span className="status-badge status-success">
                  {summary.completed_orders || 0}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                <span>
                  Pending
                </span>

                <span className="status-badge status-warning">
                  {summary.pending_orders || 0}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center py-3">
                <span>
                  Cancelled
                </span>

                <span className="status-badge status-danger">
                  {summary.cancelled_orders || 0}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* RECENT REVENUE ORDERS */}
      <div className="admin-panel mt-4">

        <div className="admin-panel-header">
          <div>
            <h3>
              Recent Completed Orders
            </h3>

            <p>
              Latest orders contributing to revenue
            </p>
          </div>
        </div>

        <div className="table-responsive">

          <table className="table align-middle">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Restaurant / Hotel</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4"
                  >
                    No completed orders yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id}>

                    <td>
                      <strong>
                        #{order.id}
                      </strong>
                    </td>

                    <td>
                      {order.user?.name || "Unknown"}
                    </td>

                    <td>
                      {order.restaurant?.name ||
                        order.hotel?.name ||
                        "-"}
                    </td>

                    <td>
                      {order.payment_method || "-"}
                    </td>

                    <td>
                      <strong>
                        {formatMoney(
                          order.total_amount
                        )}
                      </strong>
                    </td>

                    <td>
                      {order.created_at
                        ? new Date(
                            order.created_at
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default AdminRevenue;
