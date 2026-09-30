import React from "react";

function AdminOrders() {

  const orders = [
    {
      id: "#FE001",
      customer: "Milan",
      restaurant: "KFC",
      amount: "$25.00",
      status: "Completed",
    },
    {
      id: "#FE002",
      customer: "Kasun",
      restaurant: "Pizza Hut",
      amount: "$18.50",
      status: "Pending",
    },
    {
      id: "#FE003",
      customer: "Nimal",
      restaurant: "Burger King",
      amount: "$32.00",
      status: "Preparing",
    },
    {
      id: "#FE004",
      customer: "Amal",
      restaurant: "Dominos",
      amount: "$21.50",
      status: "Delivered",
    },
  ];

  const getStatusClass = (status) => {

    if (status === "Completed") {
      return "status-success";
    }

    if (status === "Pending") {
      return "status-warning";
    }

    return "status-info";
  };

  return (
    <div>

      <div className="admin-page-heading">

        <div>

          <h1 className="dashboard-title">
            Orders
          </h1>

          <p className="dashboard-subtitle">
            Manage customer food orders
          </p>

        </div>

      </div>

      <div className="admin-panel">

        <div className="admin-panel-header">

          <div>
            <h3>
              All Orders
            </h3>

            <p>
              Customer order history
            </p>
          </div>

          <select
            className="form-select"
            style={{ maxWidth: "180px" }}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Preparing</option>
            <option>Completed</option>
            <option>Delivered</option>
          </select>

        </div>

        <div className="table-responsive">

          <table className="table align-middle">

            <thead>

              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Restaurant</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order.id}>

                  <td>
                    <strong>
                      {order.id}
                    </strong>
                  </td>

                  <td>
                    {order.customer}
                  </td>

                  <td>
                    {order.restaurant}
                  </td>

                  <td>
                    {order.amount}
                  </td>

                  <td>

                    <span
                      className={`status-badge ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td>

                    <button className="btn btn-sm btn-outline-primary">
                      View Details
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminOrders;