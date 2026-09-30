import React from "react";

function AdminFoods() {

  const foods = [
    {
      id: 1,
      name: "Chicken Burger",
      restaurant: "KFC",
      price: "$8.50",
      status: "Available",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      restaurant: "Pizza Hut",
      price: "$12.00",
      status: "Available",
    },
    {
      id: 3,
      name: "Chicken Rice",
      restaurant: "Shangri-La Colombo",
      price: "$10.50",
      status: "Available",
    },
  ];

  return (
    <div>

      <div className="admin-page-heading">

        <div>

          <h1 className="dashboard-title">
            Foods
          </h1>

          <p className="dashboard-subtitle">
            Manage food items and menus
          </p>

        </div>

        <button className="btn btn-warning">
          + Add Food
        </button>

      </div>

      <div className="admin-panel">

        <div className="admin-panel-header">

          <div>

            <h3>
              Food Menu
            </h3>

            <p>
              All available food items
            </p>

          </div>

          <select
            className="form-select"
            style={{ maxWidth: "200px" }}
          >
            <option>All Restaurants</option>
            <option>KFC</option>
            <option>Pizza Hut</option>
            <option>Shangri-La Colombo</option>
          </select>

        </div>

        <div className="table-responsive">

          <table className="table align-middle">

            <thead>

              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Restaurant / Hotel</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {foods.map((food) => (

                <tr key={food.id}>

                  <td>
                    {food.id}
                  </td>

                  <td>
                    <strong>
                      {food.name}
                    </strong>
                  </td>

                  <td>
                    {food.restaurant}
                  </td>

                  <td>
                    {food.price}
                  </td>

                  <td>

                    <span className="status-badge status-success">
                      {food.status}
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

export default AdminFoods;