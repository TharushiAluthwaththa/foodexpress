
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminCustomers() {

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [editCustomer, setEditCustomer] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });


  useEffect(() => {
    fetchCustomers();
  }, []);


  const getHeaders = () => {

    const token = localStorage.getItem("admin_token");

    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
  };


  const fetchCustomers = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/customers",
        {
          headers: getHeaders(),
        }
      );

      setCustomers(response.data.customers || []);

    } catch (error) {

      console.error(
        "Customers error:",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }
  };


  const viewCustomer = async (id) => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/customers/${id}`,
        {
          headers: getHeaders(),
        }
      );

      setSelectedCustomer(response.data.customer);

    } catch (error) {

      console.error(error);

    }
  };


  const openEdit = (customer) => {

    setEditCustomer(customer);

    setForm({
      name: customer.name,
      email: customer.email,
    });

  };


  const updateCustomer = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://127.0.0.1:8000/api/admin/customers/${editCustomer.id}`,
        form,
        {
          headers: getHeaders(),
        }
      );

      alert("Customer updated successfully.");

      setEditCustomer(null);

      fetchCustomers();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to update customer."
      );

    }
  };


  const deleteCustomer = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/admin/customers/${id}`,
        {
          headers: getHeaders(),
        }
      );

      alert("Customer deleted successfully.");

      fetchCustomers();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete customer."
      );

    }
  };


  const filteredCustomers = customers.filter((customer) => {

    const value = search.toLowerCase();

    return (
      customer.name?.toLowerCase().includes(value) ||
      customer.email?.toLowerCase().includes(value)
    );

  });


  return (

    <div>

      <div className="admin-page-title">

        <h1>
          Customers
        </h1>

        <p>
          View and manage registered FoodExpress customers.
        </p>

      </div>


      <div className="admin-panel">


        {/* HEADER */}

        <div className="admin-panel-header">

          <h3>
            All Customers ({customers.length})
          </h3>

          <input
            type="text"
            className="admin-search"
            placeholder="Search customers..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {loading ? (

          <div className="admin-loading">
            Loading customers...
          </div>

        ) : filteredCustomers.length === 0 ? (

          <div className="empty-admin-data">
            No customers found.
          </div>

        ) : (

          <div className="table-responsive">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>REGISTERED</th>
                  <th>ACTIONS</th>

                </tr>

              </thead>


              <tbody>

                {filteredCustomers.map((customer) => (

                  <tr key={customer.id}>

                    <td>
                      #{customer.id}
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
                      {customer.created_at
                        ? new Date(
                            customer.created_at
                          ).toLocaleDateString()
                        : "-"
                      }
                    </td>

                    <td>

                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() =>
                          viewCustomer(customer.id)
                        }
                      >
                        👁️ View
                      </button>


                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() =>
                          openEdit(customer)
                        }
                      >
                        ✏️ Edit
                      </button>


                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          deleteCustomer(customer.id)
                        }
                      >
                        🗑️ Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* VIEW CUSTOMER MODAL */}

      {selectedCustomer && (

        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <div className="admin-modal-header">

              <h3>
                Customer Details
              </h3>

              <button
                onClick={() =>
                  setSelectedCustomer(null)
                }
              >
                ✕
              </button>

            </div>


            <div className="customer-details">

              <p>
                <strong>ID:</strong>{" "}
                #{selectedCustomer.id}
              </p>

              <p>
                <strong>Name:</strong>{" "}
                {selectedCustomer.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedCustomer.email}
              </p>

              <p>
                <strong>Registered:</strong>{" "}
                {selectedCustomer.created_at
                  ? new Date(
                      selectedCustomer.created_at
                    ).toLocaleString()
                  : "-"
                }
              </p>

            </div>


            <button
              className="btn btn-secondary"
              onClick={() =>
                setSelectedCustomer(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* EDIT CUSTOMER MODAL */}

      {editCustomer && (

        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <div className="admin-modal-header">

              <h3>
                Edit Customer
              </h3>

              <button
                onClick={() =>
                  setEditCustomer(null)
                }
              >
                ✕
              </button>

            </div>


            <form onSubmit={updateCustomer}>

              <div className="mb-3">

                <label>
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                />

              </div>


              <div className="mb-3">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  required
                />

              </div>


              <button
                type="submit"
                className="btn btn-warning"
              >
                Save Changes
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminCustomers;
