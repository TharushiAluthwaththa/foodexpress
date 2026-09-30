import React from "react";

function AdminDashboard() {

  const cards = [
    {
      icon: "👥",
      title: "Customers",
      value: "120",
      change: "+12% this month",
    },
    {
      icon: "🛒",
      title: "Orders",
      value: "85",
      change: "+8% this week",
    },
    {
      icon: "🍽️",
      title: "Restaurants",
      value: "15",
      change: "+2 new",
    },
    {
      icon: "💰",
      title: "Revenue",
      value: "$2,450",
      change: "+15% this month",
    },
  ];

  const orders = [
    {
      id: "#FE001",
      customer: "Kasun Perera",
      restaurant: "KFC",
      amount: "$24.50",
      status: "Completed",
    },
    {
      id: "#FE002",
      customer: "Nimali Silva",
      restaurant: "Pizza Hut",
      amount: "$31.20",
      status: "Pending",
    },
    {
      id: "#FE003",
      customer: "Amal Fernando",
      restaurant: "Burger House",
      amount: "$18.90",
      status: "Completed",
    },
    {
      id: "#FE004",
      customer: "Tharushi",
      restaurant: "KFC",
      amount: "$12.50",
      status: "Pending",
    },
  ];

  return (
    <div>

      <div className="admin-page-title">
        <h1>Dashboard Overview</h1>
        <p>
          Monitor your FoodExpress business from here.
        </p>
      </div>


      {/* CARDS */}

      <div className="dashboard-cards">

        {cards.map((card) => (

          <div
            className="dashboard-card"
            key={card.title}
          >

            <div>

              <h6>
                {card.title}
              </h6>

              <h2>
                {card.value}
              </h2>

              <p>
                {card.change}
              </p>

            </div>

            <div className="dashboard-card-icon">
              {card.icon}
            </div>

          </div>

        ))}

      </div>


      {/* CONTENT */}

      <div className="dashboard-grid">

        {/* ORDERS */}

        <div className="admin-panel">

          <div className="admin-panel-header">

            <h3>
              Recent Orders
            </h3>

            <a href="/admin/orders">
              View All →
            </a>

          </div>

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
                    <strong>
                      {order.amount}
                    </strong>
                  </td>

                  <td>

                    <span
                      className={`status ${
                        order.status === "Completed"
                          ? "completed"
                          : "pending"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* QUICK ACTIONS */}

        <div className="admin-panel">

          <div className="admin-panel-header">

            <h3>
              Quick Actions
            </h3>

          </div>

          <div className="d-grid gap-3">

            <button className="btn btn-warning p-3">
              ➕ Add Restaurant
            </button>

            <button className="btn btn-outline-dark p-3">
              🍔 Add Food
            </button>

            <button className="btn btn-outline-dark p-3">
              🏨 Add Hotel
            </button>

            <button className="btn btn-outline-dark p-3">
              📊 View Revenue
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;