import React from "react";

function AdminRevenue() {

  return (
    <div>

      <div className="admin-page-heading">

        <div>

          <h1 className="dashboard-title">
            Revenue
          </h1>

          <p className="dashboard-subtitle">
            Track FoodExpress sales and revenue
          </p>

        </div>

      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            💰
          </div>

          <h4>
            Total Revenue
          </h4>

          <h2>
            $2,450
          </h2>

          <p>
            All completed orders
          </p>

        </div>

        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            📦
          </div>

          <h4>
            Completed Orders
          </h4>

          <h2>
            65
          </h2>

          <p>
            Successfully delivered
          </p>

        </div>

        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            📈
          </div>

          <h4>
            Average Order
          </h4>

          <h2>
            $37.69
          </h2>

          <p>
            Average order value
          </p>

        </div>

        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            🛒
          </div>

          <h4>
            Today's Sales
          </h4>

          <h2>
            $325
          </h2>

          <p>
            Today's revenue
          </p>

        </div>

      </div>

      <div className="admin-panel mt-4">

        <div className="admin-panel-header">

          <div>

            <h3>
              Revenue Summary
            </h3>

            <p>
              Recent completed orders
            </p>

          </div>

        </div>

        <div className="table-responsive">

          <table className="table align-middle">

            <thead>

              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Amount</th>
              </tr>

            </thead>

            <tbody>

              <tr>
                <td>#FE001</td>
                <td>Milan</td>
                <td>29 Sep 2026</td>
                <td>Cash</td>
                <td>$25.00</td>
              </tr>

              <tr>
                <td>#FE002</td>
                <td>Kasun</td>
                <td>29 Sep 2026</td>
                <td>Card</td>
                <td>$18.50</td>
              </tr>

              <tr>
                <td>#FE003</td>
                <td>Nimal</td>
                <td>28 Sep 2026</td>
                <td>Cash</td>
                <td>$32.00</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminRevenue;