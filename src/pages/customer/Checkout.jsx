import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
    city: "",
    latitude: "",
    longitude: "",
    payment_method: "cash_on_delivery",
    notes: "",
  });

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // LOAD CART + CUSTOMER
  // ==============================
  useEffect(() => {
    loadCart();

    const savedUser = localStorage.getItem("customer_user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        setForm((prev) => ({
          ...prev,
          customer_name: user.name || "",
          phone: user.phone || "",
          city: user.city || "",
        }));
      } catch (error) {
        console.log("User data error:", error);
      }
    }
  }, []);

  // ==============================
  // LOAD CART
  // ==============================
  const loadCart = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/cart");

      const items = response.data.items || [];

      setCart(items);

      setSubtotal(Number(response.data.subtotal || 0));
      setDeliveryFee(Number(response.data.delivery_fee || 0));
      setTotal(Number(response.data.total || 0));

      if (items.length === 0) {
        navigate("/cart");
      }
    } catch (error) {
      console.error("Checkout cart error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("customer_token");
        localStorage.removeItem("customer_user");

        navigate("/login");
        return;
      }

      setError("Unable to load your cart.");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // FOOD HELPERS
  // ==============================
  const getFoodName = (item) => {
    return item.food?.name || "Food Item";
  };

  const getFoodImage = (item) => {
    return (
      item.food?.image ||
      "https://via.placeholder.com/100"
    );
  };

  const getFoodPrice = (item) => {
    return Number(item.food?.price || 0);
  };

  const getItemTotal = (item) => {
    return getFoodPrice(item) * Number(item.quantity || 0);
  };

  // ==============================
  // PLACE ORDER
  // ==============================
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!form.customer_name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!form.address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    if (!form.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    try {
      setPlacingOrder(true);

      // ==============================
      // SEND ORDER TO LARAVEL API
      // ==============================
      const response = await api.post("/orders", {
        customer_name: form.customer_name,
        phone: form.phone,
        address: form.address,
        city: form.city,

        // IMPORTANT:
        // Convert latitude and longitude to numbers.
        // If empty, send null.
        latitude: form.latitude
          ? Number(form.latitude)
          : null,

        longitude: form.longitude
          ? Number(form.longitude)
          : null,

        payment_method: form.payment_method,

        notes: form.notes.trim()
          ? form.notes
          : null,
      });

      console.log("Order placed:", response.data);

      // Success message
      alert("🎉 Order placed successfully!");

      // Go to My Orders
      navigate("/orders");

    } catch (error) {
  console.error("================================");
  console.error("PLACE ORDER ERROR");
  console.error("STATUS:", error.response?.status);
  console.error("DATA:", error.response?.data);
  console.error("MESSAGE:", error.message);
  console.error("================================");

  if (error.response?.status === 401) {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer_user");

    navigate("/login");
    return;
  }

  if (error.response?.status === 422) {
    const validationErrors = error.response?.data?.errors;

    if (validationErrors) {
      const firstError = Object.values(validationErrors)[0]?.[0];

      setError(
        firstError || "Please check your delivery details."
      );
    } else {
      setError(
        error.response?.data?.message ||
          "Please check your delivery details."
      );
    }

    return;
  }

  if (error.response?.data?.error) {
    setError(error.response.data.error);
    return;
  }

  if (error.response?.data?.message) {
    setError(error.response.data.message);
    return;
  }

  setError(
    "Failed to place order. Please try again."
  );
}


  };

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading checkout...</h4>
      </div>
    );
  }

  // ==============================
  // CHECKOUT PAGE
  // ==============================
  return (
    <div className="container py-5">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">
          Checkout
        </h2>

        <p className="text-muted">
          Complete your delivery details and place your order.
        </p>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="row g-4">

        {/* =====================================
            LEFT SIDE - DELIVERY FORM
        ===================================== */}
        <div className="col-lg-7">

          <div className="card shadow-sm border-0">

            <div className="card-body p-4">

              <h4 className="fw-bold mb-4">
                📦 Delivery Information
              </h4>

              <form onSubmit={handlePlaceOrder}>

                {/* CUSTOMER NAME */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Customer Name
                  </label>

                  <input
                    type="text"
                    name="customer_name"
                    value={form.customer_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your name"
                  />

                </div>

                {/* PHONE */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="07XXXXXXXX"
                  />

                </div>

                {/* ADDRESS */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Delivery Address
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    placeholder="Enter your delivery address"
                  />

                </div>

                {/* CITY */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your city"
                  />

                </div>

                {/* =====================================
                    DELIVERY LOCATION
                ===================================== */}
                <div className="card bg-light border-0 mb-4">

                  <div className="card-body">

                    <h6 className="fw-bold">
                      📍 Delivery Location
                    </h6>

                    <p className="small text-muted mb-3">
                      You can enter your map coordinates.
                    </p>

                    <div className="row">

                      {/* LATITUDE */}
                      <div className="col-md-6">

                        <label className="form-label">
                          Latitude
                        </label>

                        <input
                          type="number"
                          step="any"
                          name="latitude"
                          value={form.latitude}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Latitude"
                        />

                      </div>

                      {/* LONGITUDE */}
                      <div className="col-md-6">

                        <label className="form-label">
                          Longitude
                        </label>

                        <input
                          type="number"
                          step="any"
                          name="longitude"
                          value={form.longitude}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Longitude"
                        />

                      </div>

                    </div>

                  </div>

                </div>

                {/* =====================================
                    PAYMENT METHOD
                ===================================== */}
                <h5 className="fw-bold mb-3">
                  💳 Payment Method
                </h5>

                <div className="mb-4">

                  {/* CASH */}
                  <div className="form-check border rounded p-3 mb-2">

                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method"
                      value="cash_on_delivery"
                      checked={
                        form.payment_method ===
                        "cash_on_delivery"
                      }
                      onChange={handleChange}
                      id="cash"
                    />

                    <label
                      className="form-check-label fw-semibold"
                      htmlFor="cash"
                    >
                      💵 Cash on Delivery
                    </label>

                  </div>

                  {/* CARD */}
                  <div className="form-check border rounded p-3">

                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method"
                      value="card"
                      checked={
                        form.payment_method === "card"
                      }
                      onChange={handleChange}
                      id="card"
                    />

                    <label
                      className="form-check-label fw-semibold"
                      htmlFor="card"
                    >
                      💳 Card Payment
                    </label>

                  </div>

                </div>

                {/* =====================================
                    ORDER NOTES
                ===================================== */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Order Notes
                  </label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    placeholder="Any special instructions?"
                  />

                </div>

                {/* =====================================
                    PLACE ORDER BUTTON
                ===================================== */}
                <button
                  type="submit"
                  className="btn btn-dark btn-lg w-100"
                  disabled={placingOrder}
                >
                  {placingOrder
                    ? "Placing Order..."
                    : `Place Order - $${total.toFixed(2)}`}
                </button>

              </form>

            </div>

          </div>

        </div>

        {/* =====================================
            RIGHT SIDE - ORDER SUMMARY
        ===================================== */}
        <div className="col-lg-5">

          <div className="card shadow-sm border-0">

            <div className="card-body p-4">

              <h4 className="fw-bold mb-4">
                🛒 Your Order
              </h4>

              {/* CART ITEMS */}
              {cart.map((item) => (

                <div
                  key={item.id}
                  className="d-flex align-items-center mb-3 pb-3 border-bottom"
                >

                  {/* FOOD IMAGE */}
                  <img
                    src={getFoodImage(item)}
                    alt={getFoodName(item)}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />

                  {/* FOOD DETAILS */}
                  <div className="ms-3 flex-grow-1">

                    <h6 className="mb-1 fw-bold">
                      {getFoodName(item)}
                    </h6>

                    <small className="text-muted">
                      ${getFoodPrice(item).toFixed(2)} ×{" "}
                      {item.quantity}
                    </small>

                  </div>

                  {/* ITEM TOTAL */}
                  <strong>
                    ${getItemTotal(item).toFixed(2)}
                  </strong>

                </div>

              ))}

              {/* TOTALS */}
              <div className="mt-4">

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>

                  <span>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Fee</span>

                  <span>
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between">

                  <h5 className="fw-bold">
                    Total
                  </h5>

                  <h5 className="fw-bold">
                    ${total.toFixed(2)}
                  </h5>

                </div>

              </div>

            </div>

          </div>

          {/* BACK TO CART */}
          <button
            className="btn btn-outline-secondary w-100 mt-3"
            onClick={() => navigate("/cart")}
          >
            ← Back to Cart
          </button>

        </div>

      </div>

    </div>
  );
}