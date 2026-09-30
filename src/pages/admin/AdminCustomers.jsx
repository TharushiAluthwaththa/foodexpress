import React from "react";

function AdminCustomers() {

  const customers = [
    {
      id: 1,
      name: "Milan",
      email: "milan@gmail.com",
      phone: "0771234567",
      orders: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "Kasun Perera",
      email: "kasun@gmail.com",
      phone: "0712345678",
      orders: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Nimal Silva",
      email: "nimal@gmail.com",
      phone: "0762345678",
      orders: 5,
      status: "Active",
    },
  ];

  return (
    <div>

      <div className="admin-page-heading">

        <div>
          <h1 className="dashboard-title">
            Customers
          </h1>

          <p className="dashboard-subtitle">
            Manage registered FoodExpress customers
          </p>
        </div>

        <button className="btn btn-warning">
          + Add Customer
        </button>

      </div>

      <div className="admin-panel">

        <div className="admin-panel-header">

          <div>
            <h3>
              Customer List
            </h3>

            <p>
              All registered customers
            </p>
          </div>

          <input
            type="text"
            className="form-control"
            placeholder="Search customer..."
            style={{ maxWidth: "230px" }}
          />

        </div>

        <div className="table-responsive">

          <table className="table align-middle">

            <thead>

              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {customers.map((customer) => (

                <tr key={customer.id}>

                  <td>
                    {customer.id}
                  </td>

                  <td>
                    <strong>
                      {customer.name}
                    </strong>
                  </td>

                  <td>
                    {customer.email}
                  </td>

                  <td>
                    {customer.phone}
                  </td>

                  <td>
                    {customer.orders}
                  </td>

                  <td>
                    <span className="status-badge status-success">
                      {customer.status}
                    </span>
                  </td>

                  <td>

                    <button className="btn btn-sm btn-outline-primary me-2">
                      View
                    </button>

                    <button className="btn btn-sm btn-outline-danger">
                      Delete
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

export default AdminCustomers;