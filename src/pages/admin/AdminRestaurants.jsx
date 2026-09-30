import React from "react";

function AdminRestaurants() {

  const restaurants = [
    {
      id: 1,
      name: "KFC",
      cuisine: "Fast Food",
      address: "Colombo",
      rating: "4.5",
      status: "Active",
    },
    {
      id: 2,
      name: "Pizza Hut",
      cuisine: "Pizza",
      address: "Kandy",
      rating: "4.3",
      status: "Active",
    },
    {
      id: 3,
      name: "Burger King",
      cuisine: "Burgers",
      address: "Galle",
      rating: "4.4",
      status: "Active",
    },
  ];

  return (
    <div>

      <div className="admin-page-heading">

        <div>

          <h1 className="dashboard-title">
            Restaurants
          </h1>

          <p className="dashboard-subtitle">
            Manage restaurants available on FoodExpress
          </p>

        </div>

        <button className="btn btn-warning">
          + Add Restaurant
        </button>

      </div>

      <div className="admin-panel">

        <div className="admin-panel-header">

          <div>

            <h3>
              Restaurant List
            </h3>

            <p>
              All restaurants
            </p>

          </div>

          <input
            className="form-control"
            placeholder="Search restaurant..."
            style={{ maxWidth: "230px" }}
          />

        </div>

        <div className="table-responsive">

          <table className="table align-middle">

            <thead>

              <tr>
                <th>#</th>
                <th>Restaurant</th>
                <th>Cuisine</th>
                <th>Address</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {restaurants.map((restaurant) => (

                <tr key={restaurant.id}>

                  <td>
                    {restaurant.id}
                  </td>

                  <td>
                    <strong>
                      {restaurant.name}
                    </strong>
                  </td>

                  <td>
                    {restaurant.cuisine}
                  </td>

                  <td>
                    {restaurant.address}
                  </td>

                  <td>
                    ⭐ {restaurant.rating}
                  </td>

                  <td>

                    <span className="status-badge status-success">
                      {restaurant.status}
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

export default AdminRestaurants;