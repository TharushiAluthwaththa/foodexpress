import React from "react";

function AdminHotels() {

  const hotels = [
    {
      id: 1,
      name: "Shangri-La Colombo",
      address: "Colombo",
      phone: "0112345678",
      status: "Active",
    },
    {
      id: 2,
      name: "Cinnamon Grand",
      address: "Colombo",
      phone: "0112233445",
      status: "Active",
    },
    {
      id: 3,
      name: "Jetwing Blue",
      address: "Negombo",
      phone: "0312233445",
      status: "Active",
    },
  ];

  return (
    <div>

      <div className="admin-page-heading">

        <div>

          <h1 className="dashboard-title">
            Hotels
          </h1>

          <p className="dashboard-subtitle">
            Manage hotels and their food menus
          </p>

        </div>

        <button className="btn btn-warning">
          + Add Hotel
        </button>

      </div>

      <div className="admin-panel">

        <div className="admin-panel-header">

          <div>

            <h3>
              Hotel List
            </h3>

            <p>
              All registered hotels
            </p>

          </div>

          <input
            className="form-control"
            placeholder="Search hotel..."
            style={{ maxWidth: "230px" }}
          />

        </div>

        <div className="table-responsive">

          <table className="table align-middle">

            <thead>

              <tr>
                <th>#</th>
                <th>Hotel</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {hotels.map((hotel) => (

                <tr key={hotel.id}>

                  <td>
                    {hotel.id}
                  </td>

                  <td>
                    <strong>
                      {hotel.name}
                    </strong>
                  </td>

                  <td>
                    {hotel.address}
                  </td>

                  <td>
                    {hotel.phone}
                  </td>

                  <td>
                    <span className="status-badge status-success">
                      {hotel.status}
                    </span>
                  </td>

                  <td>

                    <button className="btn btn-sm btn-outline-primary me-2">
                      Edit
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

export default AdminHotels;