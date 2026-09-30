import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function RestaurantMenu() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [addingFood, setAddingFood] = useState(null);
  const [notification, setNotification] = useState("");

  const restaurant = {
    name:
      id === "1"
        ? "KFC"
        : id === "2"
        ? "Pizza Hut"
        : "FoodExpress Restaurant",

    type: id === "2" ? "Pizza & Italian" : "Fast Food",

    rating: "4.8",
  };

  const foods = [
    {
      id: 1,
      name: "Chicken Burger",
      description:
        "Crispy chicken, fresh lettuce and special sauce.",
      price: 8.99,
      emoji: "🍔",
    },
    {
      id: 2,
      name: "Chicken Bucket",
      description:
        "Crispy fried chicken pieces with delicious seasoning.",
      price: 14.99,
      emoji: "🍗",
    },
    {
      id: 3,
      name: "French Fries",
      description:
        "Golden crispy fries with a little salt.",
      price: 4.99,
      emoji: "🍟",
    },
    {
      id: 4,
      name: "Cheese Burger",
      description:
        "Beef patty, cheese, lettuce and fresh vegetables.",
      price: 9.99,
      emoji: "🍔",
    },
    {
      id: 5,
      name: "Chicken Wings",
      description:
        "Spicy and crispy chicken wings.",
      price: 10.99,
      emoji: "🍗",
    },
    {
      id: 6,
      name: "Soft Drink",
      description:
        "Cold refreshing soft drink.",
      price: 2.99,
      emoji: "🥤",
    },
  ];

  // ========================================
  // ADD TO CART
  // ========================================

  const addToCart = async (food) => {
    const customerToken =
      localStorage.getItem("customer_token");

    // Customer login නැත්නම් login page එකට යවන්න
    if (!customerToken) {
      navigate("/login");
      return;
    }

    try {
      setAddingFood(food.id);
      setNotification("");

      const response = await api.post("/cart", {
        food_id: food.id,
        quantity: 1,
      });

      setNotification(
        response.data.message ||
          `${food.name} added to cart successfully!`
      );

      // Notification එක තත්පර 3කින් hide කරන්න
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      console.error("Add to cart error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("customer_token");
        localStorage.removeItem("customer_user");

        navigate("/login");
        return;
      }

      setNotification(
        error.response?.data?.message ||
          "Failed to add item to cart."
      );

      setTimeout(() => {
        setNotification("");
      }, 3000);
    } finally {
      setAddingFood(null);
    }
  };

  return (
    <div
      style={{
        background: "#fffaf2",
        minHeight: "80vh",
        paddingBottom: "60px",
      }}
    >

      {/* ========================================
          SUCCESS NOTIFICATION
      ======================================== */}

      {notification && (
        <div
          style={{
            position: "fixed",
            top: "90px",
            right: "25px",
            zIndex: 9999,
            background: "#198754",
            color: "white",
            padding: "15px 22px",
            borderRadius: "12px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.2)",
            fontWeight: "600",
            minWidth: "280px",
          }}
        >
          🛒 {notification}
        </div>
      )}

      {/* ========================================
          RESTAURANT HEADER
      ======================================== */}

      <div
        style={{
          background:
            "linear-gradient(135deg, #ff9f1c, #ff6b35)",
          color: "white",
          padding: "60px 0",
        }}
      >
        <div className="container">

          <Link
            to="/restaurants"
            className="text-white text-decoration-none"
          >
            ← Back to Restaurants
          </Link>

          <div className="row align-items-center mt-4">

            <div className="col-md-8">

              <span className="badge bg-light text-dark mb-3">
                {restaurant.type}
              </span>

              <h1 className="fw-bold display-4">
                {restaurant.name}
              </h1>

              <p className="fs-5">
                Delicious food delivered directly to your
                doorstep.
              </p>

              <div className="fs-5">
                ⭐ {restaurant.rating}
                &nbsp; • &nbsp;
                🛵 20-30 min
              </div>

            </div>

            <div className="col-md-4 text-center">

              <div
                style={{
                  fontSize: "130px",
                  background:
                    "rgba(255,255,255,.2)",
                  borderRadius: "30px",
                  padding: "20px",
                }}
              >
                🍗
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ========================================
          FOOD MENU
      ======================================== */}

      <div className="container py-5">

        <div className="mb-4">

          <small
            style={{
              color: "#ff9f1c",
              fontWeight: "800",
              letterSpacing: "2px",
            }}
          >
            MENU
          </small>

          <h2 className="fw-bold">
            Popular Food
          </h2>

          <p className="text-muted">
            Choose your favorite meals and add them
            to your cart.
          </p>

        </div>

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

                {/* Food Image / Emoji */}

                <div
                  style={{
                    height: "190px",
                    background:
                      "linear-gradient(135deg,#fff0d0,#ffe0a3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "100px",
                  }}
                >
                  {food.emoji}
                </div>

                {/* Food Details */}

                <div className="card-body p-4">

                  <h4 className="fw-bold">
                    {food.name}
                  </h4>

                  <p className="text-muted">
                    {food.description}
                  </p>

                  <div
                    className="d-flex justify-content-between align-items-center mt-4"
                  >

                    <strong
                      style={{
                        color: "#ff8c00",
                        fontSize: "22px",
                      }}
                    >
                      ${food.price.toFixed(2)}
                    </strong>

                    <button
                      className="btn btn-warning fw-bold"
                      onClick={() => addToCart(food)}
                      disabled={addingFood === food.id}
                    >
                      {addingFood === food.id
                        ? "Adding..."
                        : "+ Add"}
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* ========================================
            VIEW CART
        ======================================== */}

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

export default RestaurantMenu;
