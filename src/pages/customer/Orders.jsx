
import React from "react";
import { Link } from "react-router-dom";

function Orders() {
  const orders = JSON.parse(
    localStorage.getItem("customer_orders") || "[]"
  );

  return (
    <div
      style={{
        background: "#fffaf2",
        minHeight: "80vh",
        padding: "60px 0",
      }}
    >
      <div className="container">
        <div className="mb-5">
          <small
            style={{
              color: "#ff9f1c",
              fontWeight: "800",
              letterSpacing: "2px",
            }}
          >
            FOOD EXPRESS
          </small>

          <h1 className="fw-bold">
            📦 My Orders
          </h1>

          <p className="text-muted">
            Track your previous FoodExpress orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div
            className="card border-0 shadow-sm text-center p-5"
            style={{ borderRadius: "20px" }}
          >
            <div style={{ fontSize: "80px" }}>
              🍽️
            </div>

            <h2 className="fw-bold mt-3">
              No orders yet
            </h2>

            <p className="text-muted">
              Your delicious journey starts here.
            </p>

            <Link
              to="/restaurants"
              className="btn btn-warning px-4 py-3 fw-bold mx-auto"
            >
              🍔 Start Ordering
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <div
                  className="col-12"
                  key={order.id}
                >
                  <div
                    className="card border-0 shadow-sm"
                    style={{ borderRadius: "20px" }}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                        <div>
                          <h4 className="fw-bold">
                            Order {order.id}
                          </h4>

                          <small className="text-muted">
                            {new Date(
                              order.createdAt
                            ).toLocaleString()}
                          </small>
                        </div>

                        <span className="badge bg-warning text-dark px-3 py-2">
                          {order.status}
                        </span>
                      </div>

                      <hr />

                      <div className="row">
                        <div className="col-md-8">
                          {order.items?.map(
                            (item, index) => (
                              <div
                                key={index}
                                className="d-flex justify-content-between mb-3"
                              >
                                <div>
                                  <strong>
                                    {item.name}
                                  </strong>

                                  <small className="d-block text-muted">
                                    x{item.quantity || 1}
                                  </small>
                                </div>

                                <strong>
                                  $
                                  {(
                                    Number(
                                      item.price || 0
                                    ) *
                                    Number(
                                      item.quantity || 1
                                    )
                                  ).toFixed(2)}
                                </strong>
                              </div>
                            )
                          )}
                        </div>

                        <div className="col-md-4">
                          <div
                            className="p-3 rounded-3"
                            style={{
                              background: "#fff8e7",
                            }}
                          >
                            <small className="text-muted">
                              Delivery Address
                            </small>

                            <p className="mb-2 fw-semibold">
                              {order.address}
                            </p>

                            <small className="text-muted">
                              City
                            </small>

                            <p className="fw-semibold">
                              {order.city}
                            </p>

                            <hr />

                            <div className="d-flex justify-content-between">
                              <strong>Total</strong>

                              <strong
                                style={{
                                  color: "#ff9f1c",
                                  fontSize: "20px",
                                }}
                              >
                                $
                                {Number(
                                  order.total || 0
                                ).toFixed(2)}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
