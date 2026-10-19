import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";

function HotelMenu() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHotelMenu();
  }, [id]);

  const loadHotelMenu = async () => {
    try {
      setLoading(true);
      setError("");

      // Get hotel details
      const hotelResponse = await api.get(`/hotels/${id}`);

      setHotel(hotelResponse.data.hotel || hotelResponse.data);

      // Get hotel foods
      const foodsResponse = await api.get(`/hotels/${id}/foods`);

      setFoods(
        foodsResponse.data.foods ||
        foodsResponse.data.data ||
        foodsResponse.data ||
        []
      );

    } catch (error) {
      console.error("Hotel menu error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load hotel menu."
      );
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (food) => {
    try {
      await api.post("/cart", {
        food_id: food.id,
        quantity: 1,
      });

      alert(`🛒 ${food.name} added to cart!`);

    } catch (error) {
      console.error("Add to cart error:", error);

      if (error.response?.status === 401) {
        alert("Please login first.");
        return;
      }

      alert(
        error.response?.data?.message ||
        "Failed to add item to cart."
      );
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary mb-3"></div>
          <h5>Loading hotel menu...</h5>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error}
        </div>

        <Link
          to="/hotels"
          className="btn btn-dark"
        >
          ← Back to Hotels
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fffaf2",
        minHeight: "80vh",
        paddingBottom: "60px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#6c5ce7,#0984e3)",
          color: "white",
          padding: "60px 0",
        }}
      >
        <div className="container">
          <Link
            to="/hotels"
            className="text-white text-decoration-none"
          >
            ← Back to Hotels
          </Link>

          <h1 className="fw-bold mt-4 mb-2">
            {hotel?.name || "Hotel Menu"}
          </h1>

          <p className="mb-0">
            {hotel?.description ||
              "Delicious meals prepared for you."}
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="container py-5">
        <div className="mb-4">
          <small
            style={{
              color: "#6c5ce7",
              fontWeight: "800",
              letterSpacing: "2px",
            }}
          >
            HOTEL MENU
          </small>

          <h2 className="fw-bold">
            Delicious Meals
          </h2>

          <p className="text-muted">
            Select your favorite meal and add it to the cart.
          </p>
        </div>

        {foods.length === 0 ? (
          <div className="alert alert-info">
            No food items are available at this hotel yet.
          </div>
        ) : (
          <div className="row g-4">
            {foods.map((food) => (
              <div
                className="col-md-6 col-lg-4"
                key={food.id}
              >
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  {/* Image / Emoji */}
                  <div
                    style={{
                      height: "190px",
                      background:
                        "linear-gradient(135deg,#e8e4ff,#d6ecff)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "90px",
                    }}
                  >
                    🍽️
                  </div>

                  <div className="card-body p-4 d-flex flex-column">
                    <h4 className="fw-bold">
                      {food.name}
                    </h4>

                    <p className="text-muted">
                      {food.description ||
                        "Delicious meal prepared fresh for you."}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                      <strong
                        style={{
                          color: "#6c5ce7",
                          fontSize: "22px",
                        }}
                      >
                        $
                        {Number(food.price).toFixed(2)}
                      </strong>

                      <button
                        className="btn btn-primary fw-bold"
                        onClick={() => addToCart(food)}
                        disabled={
                          food.is_available === false
                        }
                      >
                        {food.is_available === false
                          ? "Unavailable"
                          : "+ Add"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cart Button */}
        <div className="text-center mt-5">
          <Link
            to="/cart"
            className="btn btn-dark px-5 py-3 fw-bold"
          >
            🛒 View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotelMenu;