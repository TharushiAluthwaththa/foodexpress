import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  // =========================
  // LOAD CART FROM LARAVEL
  // =========================
  const loadCart = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/cart");

      setCart(response.data.items || []);
    } catch (err) {
      console.error("Cart loading error:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("customer_token");
        localStorage.removeItem("customer_user");

        navigate("/login");
        return;
      }

      setError(
        err.response?.data?.message ||
          "Failed to load cart."
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadCart();
  }, []);

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    try {
      await api.put(`/cart/${item.id}`, {
        quantity: newQuantity,
      });

      await loadCart();
    } catch (err) {
      console.error("Quantity update error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to update quantity."
      );
    }
  };

  // =========================
  // REMOVE ITEM
  // =========================
  const removeItem = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);

      await loadCart();
    } catch (err) {
      console.error("Remove cart item error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to remove item."
      );
    }
  };

  // =========================
  // CLEAR CART
  // =========================
  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) {
      return;
    }

    try {
      await api.delete("/cart");

      setCart([]);
    } catch (err) {
      console.error("Clear cart error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to clear cart."
      );
    }
  };

  // =========================
  // PRICE
  // =========================
  const getPrice = (item) => {
    return Number(item.food?.price || 0);
  };

  // =========================
  // QUANTITY
  // =========================
  const getQuantity = (item) => {
    return Number(item.quantity || 1);
  };

  // =========================
  // SUBTOTAL
  // =========================
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      getPrice(item) *
        getQuantity(item),
    0
  );

  const deliveryFee =
    cart.length > 0 ? 2.5 : 0;

  const total =
    subtotal + deliveryFee;

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div
        style={{
          background: "#fffaf2",
          minHeight: "80vh",
          padding: "100px 0",
        }}
      >
        <div className="container text-center">
          <div
            className="spinner-border text-warning"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          ></div>

          <h5 className="mt-3">
            Loading your cart...
          </h5>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div
        style={{
          background: "#fffaf2",
          minHeight: "80vh",
          padding: "80px 0",
        }}
      >
        <div className="container text-center">
          <div
            style={{
              fontSize: "70px",
            }}
          >
            ⚠️
          </div>

          <h3 className="fw-bold mt-3">
            Unable to load cart
          </h3>

          <p className="text-danger">
            {error}
          </p>

          <button
            onClick={loadCart}
            className="btn btn-warning px-4"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // EMPTY CART
  // =========================
  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container py-5">
          <div className="text-center py-5">

            <div
              style={{
                fontSize: "90px",
              }}
            >
              🛒
            </div>

            <h1 className="fw-bold mt-3">
              Your Cart is Empty
            </h1>

            <p className="text-muted">
              Looks like you haven't added
              any delicious food yet.
            </p>

            <Link
              to="/restaurants"
              className="btn btn-warning px-4 py-3 mt-3 fw-bold"
            >
              🍔 Start Ordering
            </Link>

          </div>
        </div>
      </div>
    );
  }

  // =========================
  // CART PAGE
  // =========================
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

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <small
              style={{
                color: "#ff9f1c",
                fontWeight: "800",
                letterSpacing: "2px",
              }}
            >
              FOOD EXPRESS
            </small>

            <h1 className="fw-bold mb-0">
              🛒 Your Cart
            </h1>

            <p className="text-muted">
              {cart.length} item
              {cart.length !== 1 ? "s" : ""} in
              your cart
            </p>
          </div>

          <button
            onClick={clearCart}
            className="btn btn-outline-danger"
          >
            Clear Cart
          </button>

        </div>

        <div className="row g-4">

          {/* ITEMS */}

          <div className="col-lg-8">

            {cart.map((item) => {

              const food = item.food;

              return (
                <div
                  key={item.id}
                  className="card border-0 shadow-sm mb-3"
                  style={{
                    borderRadius: "18px",
                  }}
                >
                  <div className="card-body p-4">

                    <div className="row align-items-center">

                      {/* IMAGE */}

                      <div className="col-md-2">

                        {food?.image ? (

                          <img
                            src={food.image}
                            alt={food.name}
                            style={{
                              width: "90px",
                              height: "90px",
                              objectFit: "cover",
                              borderRadius: "15px",
                            }}
                          />

                        ) : (

                          <div
                            style={{
                              width: "90px",
                              height: "90px",
                              borderRadius: "15px",
                              background: "#fff0d4",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "45px",
                            }}
                          >
                            🍔
                          </div>

                        )}

                      </div>

                      {/* NAME */}

                      <div className="col-md-4">

                        <h5 className="fw-bold mb-1">
                          {food?.name || "Food Item"}
                        </h5>

                        <small className="text-muted">
                          {food?.restaurant?.name ||
                            food?.hotel?.name ||
                            "FoodExpress"}
                        </small>

                        <div
                          className="mt-2"
                          style={{
                            color: "#ff9f1c",
                            fontWeight: "700",
                          }}
                        >
                          $
                          {getPrice(item).toFixed(2)}
                        </div>

                      </div>

                      {/* QUANTITY */}

                      <div className="col-md-3">

                        <div
                          className="d-flex align-items-center"
                          style={{
                            gap: "12px",
                          }}
                        >

                          <button
                            onClick={() =>
                              updateQuantity(
                                item,
                                getQuantity(item) - 1
                              )
                            }
                            className="btn btn-light border"
                            style={{
                              width: "38px",
                              height: "38px",
                              borderRadius: "10px",
                            }}
                          >
                            −
                          </button>

                          <strong>
                            {getQuantity(item)}
                          </strong>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item,
                                getQuantity(item) + 1
                              )
                            }
                            className="btn btn-warning"
                            style={{
                              width: "38px",
                              height: "38px",
                              borderRadius: "10px",
                            }}
                          >
                            +
                          </button>

                        </div>

                      </div>

                      {/* TOTAL */}

                      <div className="col-md-2 text-end">

                        <strong
                          style={{
                            fontSize: "18px",
                          }}
                        >
                          $
                          {(
                            getPrice(item) *
                            getQuantity(item)
                          ).toFixed(2)}
                        </strong>

                        <button
                          onClick={() =>
                            removeItem(item.id)
                          }
                          className="btn btn-sm btn-link text-danger d-block ms-auto"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* SUMMARY */}

          <div className="col-lg-4">

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
                  Order Summary
                </h4>

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
                      fontSize: "23px",
                    }}
                  >
                    ${total.toFixed(2)}
                  </strong>

                </div>

                <button
                  onClick={() =>
                    navigate("/checkout")
                  }
                  className="btn btn-warning w-100 py-3 fw-bold"
                  style={{
                    borderRadius: "12px",
                  }}
                >
                  Proceed to Checkout →
                </button>

                <Link
                  to="/restaurants"
                  className="btn btn-outline-dark w-100 py-3 mt-2 fw-bold"
                  style={{
                    borderRadius: "12px",
                  }}
                >
                  ← Continue Shopping
                </Link>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;