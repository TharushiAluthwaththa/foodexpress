import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const getHeaders = () => {

    const token = localStorage.getItem("admin_token");

    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

  };


  useEffect(() => {

    fetchOrders();

  }, []);


  const fetchOrders = async () => {

    try {

      const response = await axios.get(
        "http://10.0.2.2:8000/api/admin/orders",
        {
          headers: getHeaders(),
        }
      );

      setOrders(response.data.orders || []);

    } catch (error) {

      console.error(
        "Orders error:",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }

  };


  const updateStatus = async (
    orderId,
    status
  ) => {

    try {

      await axios.put(
        `http://10.0.2.2:8000/api/admin/orders/${orderId}/status`,
        {
          status,
        },
        {
          headers: getHeaders(),
        }
      );

      alert("Order status updated.");

      fetchOrders();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to update order status."
      );

    }

  };


  const getStatusClass = (status) => {

    switch (status) {

      case "Completed":
        return "completed";

      case "Cancelled":
        return "cancelled";

      case "Processing":
      case "Preparing":
      case "Out for Delivery":
        return "processing";

      default:
        return "pending";

    }

  };


  return (

    <div>

      <div className="admin-page-title">

        <h1>
          Orders
        </h1>

        <p>
          View customer orders and update order status.
        </p>

      </div>


      <div className="admin-panel">

        <div className="admin-panel-header">

          <h3>
            All Orders ({orders.length})
          </h3>

        </div>


        {loading ? (

          <div className="admin-loading">
            Loading orders...
          </div>

        ) : orders.length === 0 ? (

          <div className="empty-admin-data">
            No orders found.
          </div>

        ) : (

          <div className="table-responsive">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>ORDER</th>
                  <th>CUSTOMER</th>
                  <th>RESTAURANT</th>
                  <th>AMOUNT</th>
                  <th>PAYMENT</th>
                  <th>STATUS</th>
                  <th>ACTION</th>

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
                      {order.user?.name || "-"}
                    </td>

                    <td>
                      {order.restaurant?.name || "-"}
                    </td>

                    <td>
                      Rs.{" "}
                      {Number(
                        order.total_amount || 0
                      ).toLocaleString()}
                    </td>

                    <td>
                      {order.payment_method || "-"}
                    </td>

                    <td>

                      <select
                        className={`order-status-select ${getStatusClass(
                          order.status
                        )}`}
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order.id,
                            e.target.value
                          )
                        }
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Preparing">
                          Preparing
                        </option>

                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>

                    <td>

                      <button
                        className="btn btn-sm btn-info"
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                      >
                        ðŸ‘ï¸ Details
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* ORDER DETAILS */}

      {selectedOrder && (

        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <div className="admin-modal-header">

              <h3>
                Order #{selectedOrder.id}
              </h3>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                âœ•
              </button>

            </div>


            <div className="customer-details">

              <p>
                <strong>Customer:</strong>{" "}
                {selectedOrder.user?.name || "-"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedOrder.user?.email || "-"}
              </p>

              <p>
                <strong>Restaurant:</strong>{" "}
                {selectedOrder.restaurant?.name || "-"}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                Rs.{" "}
                {Number(
                  selectedOrder.total_amount || 0
                ).toLocaleString()}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {selectedOrder.payment_method || "-"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedOrder.status}
              </p>

              <p>
                <strong>Delivery Address:</strong>{" "}
                {selectedOrder.delivery_address || "-"}
              </p>

            </div>


            <button
              className="btn btn-secondary"
              onClick={() =>
                setSelectedOrder(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminOrders;

