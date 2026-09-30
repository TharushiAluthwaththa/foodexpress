
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [cart] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
    } catch {
      return [];
    }
  });

  const customer = JSON.parse(
    localStorage.getItem("customer_user") || "null"
  );

  const [form, setForm] = useState({
    name: customer?.name || "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [payment, setPayment] = useState("cash");

  const getPrice = (item) =>
    Number(item.price || item.amount || 0);

  const getQuantity = (item) =>
    Number(item.quantity || 1);

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      getPrice(item) * getQuantity(item),
    0
  );

  const deliveryFee = cart.length > 0 ? 2.5 : 0;

  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city
    ) {
      alert(
        "Please fill all required delivery details."
      );
      return;
    }

    const order = {
      id: "FE" + Date.now(),
      customer: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      notes: form.notes,
      payment,
      items: cart,
      subtotal,
      deliveryFee,
      total,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const oldOrders = JSON.parse(
      localStorage.getItem("customer_orders") || "[]"
    );

    oldOrders.push(order);

    localStorage.setItem(
      "customer_orders",
      JSON.stringify(oldOrders)
    );

    localStorage.removeItem("cart");

    alert("🎉 Order placed successfully!");

    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div
        style={{
          minHeight: "75vh",
          background: "#fffaf2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <div style={{ fontSize: "80px" }}>
            🛒
          </div>

          <h2 className="fw-bold">
            Your cart is empty
          </h2>

          <p className="text-muted">
            Add some delicious food before checkout.
          </p>

          <Link
            to="/restaurants"
            className="btn btn-warning px-4 py-3 fw-bold"
          >
            🍔 Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fffaf2",
        minHeight: "80vh",
        padding: "50px 0",
      }}
    >
      <div className="container">

        {/* HEADER */}

        <div className="mb-4">
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
            Checkout
          </h1>

          <p className="text-muted">
            Complete your delivery details and place your
            order.
          </p>
        </div>

        <form onSubmit={placeOrder}>

          <div className="row g-4">

            {/* LEFT SIDE */}

            <div className="col-lg-7">

              {/* DELIVERY DETAILS */}

              <div
                className="card border-0 shadow-sm mb-4"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-4">

                  <h4 className="fw-bold mb-4">
                    📍 Delivery Details
                  </h4>

                  <div className="row g-3">

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Full Name *
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Phone Number *
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="07XXXXXXXX"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Delivery Address *
                      </label>

                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        placeholder="House number, street, area..."
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        City *
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="Colombo"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Delivery Instructions
                      </label>

                      <input
                        type="text"
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="Optional"
                      />
                    </div>

                  </div>
                </div>
              </div>

              {/* MAP */}

              <div
                className="card border-0 shadow-sm mb-4"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-4">

                  <h4 className="fw-bold mb-3">
                    🗺️ Delivery Location
                  </h4>

                  <div
                    style={{
                      height: "220px",
                      borderRadius: "15px",
                      background:
                        "linear-gradient(135deg,#dff3e6,#c8e6ff)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      color: "#555",
                    }}
                  >
                    <div style={{ fontSize: "50px" }}>
                      📍
                    </div>

                    <strong>
                      Your delivery location
                    </strong>

                    <small>
                      Map integration can be added next
                    </small>
                  </div>

                </div>
              </div>

              {/* PAYMENT */}

              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-4">

                  <h4 className="fw-bold mb-4">
                    💳 Payment Method
                  </h4>

                  <div className="row g-3">

                    <div className="col-md-6">

                      <label
                        className="w-100"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <div
                          className={`border rounded-3 p-3 ${
                            payment === "cash"
                              ? "border-warning bg-warning-subtle"
                              : ""
                          }`}
                        >

                          <input
                            type="radio"
                            name="payment"
                            value="cash"
                            checked={
                              payment === "cash"
                            }
                            onChange={(e) =>
                              setPayment(
                                e.target.value
                              )
                            }
                            className="me-2"
                          />

                          💵 Cash on Delivery

                        </div>
                      </label>

                    </div>

                    <div className="col-md-6">

                      <label
                        className="w-100"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <div
                          className={`border rounded-3 p-3 ${
                            payment === "card"
                              ? "border-warning bg-warning-subtle"
                              : ""
                          }`}
                        >

                          <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={
                              payment === "card"
                            }
                            onChange={(e) =>
                              setPayment(
                                e.target.value
                              )
                            }
                            className="me-2"
                          />

                          💳 Card Payment

                        </div>
                      </label>

                    </div>

                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="col-lg-5">

              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: "20px",
                  position: "sticky",
                  top: "100px",
                }}
              >

                <div className="card-body p-4">

                  <h4 className="fw-bold mb-4">
                    🧾 Your Order
                  </h4>

                  {cart.map((item, index) => (

                    <div
                      key={index}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >

                      <div className="d-flex align-items-center gap-3">

                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "10px",
                            background: "#fff1d6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                          }}
                        >
                          🍔
                        </div>

                        <div>
                          <strong>
                            {item.name ||
                              "Food Item"}
                          </strong>

                          <small className="d-block text-muted">
                            x
                            {getQuantity(item)}
                          </small>
                        </div>

                      </div>

                      <strong>
                        $
                        {(
                          getPrice(item) *
                          getQuantity(item)
                        ).toFixed(2)}
                      </strong>

                    </div>

                  ))}

                  <hr />

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">
                      Subtotal
                    </span>

                    <strong>
                      ${subtotal.toFixed(2)}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">
                      Delivery Fee
                    </span>

                    <strong>
                      ${deliveryFee.toFixed(2)}
                    </strong>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between mb-4">

                    <strong
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      Total
                    </strong>

                    <strong
                      style={{
                        color: "#ff9f1c",
                        fontSize: "25px",
                      }}
                    >
                      ${total.toFixed(2)}
                    </strong>

                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning w-100 py-3 fw-bold"
                    style={{
                      borderRadius: "12px",
                      fontSize: "17px",
                    }}
                  >
                    🎉 Place Order
                  </button>

                  <Link
                    to="/cart"
                    className="btn btn-outline-dark w-100 py-3 mt-2 fw-bold"
                    style={{
                      borderRadius: "12px",
                    }}
                  >
                    ← Back to Cart
                  </Link>

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      🔒 Your order information is secure
                    </small>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
}

export default Checkout;