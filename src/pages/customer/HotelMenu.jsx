
import React from "react";
import { Link, useParams } from "react-router-dom";

function HotelMenu() {
  const { id } = useParams();

  const hotelName =
    id === "1"
      ? "Grand Hotel"
      : id === "2"
      ? "Ocean View Hotel"
      : "FoodExpress Hotel";

  const foods = [
    {
      id: 101,
      name: "Chicken Fried Rice",
      description: "Fragrant rice with chicken and fresh vegetables.",
      price: 9.99,
      emoji: "🍚",
    },
    {
      id: 102,
      name: "Chicken Kottu",
      description: "Sri Lankan style spicy chicken kottu.",
      price: 8.99,
      emoji: "🍛",
    },
    {
      id: 103,
      name: "Devilled Chicken",
      description: "Spicy chicken cooked with onions and peppers.",
      price: 10.99,
      emoji: "🍗",
    },
    {
      id: 104,
      name: "Pasta",
      description: "Creamy pasta with chicken and vegetables.",
      price: 11.99,
      emoji: "🍝",
    },
    {
      id: 105,
      name: "Chocolate Cake",
      description: "Soft chocolate cake with chocolate cream.",
      price: 5.99,
      emoji: "🍰",
    },
    {
      id: 106,
      name: "Fresh Juice",
      description: "Freshly prepared fruit juice.",
      price: 3.99,
      emoji: "🥤",
    },
  ];

  const addToCart = (food) => {
    const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = oldCart.find(
      (item) => item.id === food.id && item.hotel === hotelName
    );

    let newCart;

    if (existing) {
      newCart = oldCart.map((item) =>
        item.id === food.id && item.hotel === hotelName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [
        ...oldCart,
        {
          ...food,
          quantity: 1,
          hotel: hotelName,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(newCart));

    alert(`${food.name} added to cart! 🛒`);
  };

  return (
    <div
      style={{
        background: "#fffaf2",
        minHeight: "80vh",
        paddingBottom: "60px",
      }}
    >
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

          <div className="row align-items-center mt-4">
            <div className="col-md-8">
              <span className="badge bg-light text-dark mb-3">
                HOTEL RESTAURANT
              </span>

              <h1 className="display-4 fw-bold">
                {hotelName}
              </h1>

              <p className="fs-5">
                Premium hotel food delivered to your doorstep.
              </p>

              <div className="fs-5">
                ⭐ 4.8 &nbsp; • &nbsp; 🛵 25-35 min
              </div>
            </div>

            <div className="col-md-4 text-center">
              <div
                style={{
                  fontSize: "120px",
                  background: "rgba(255,255,255,.15)",
                  borderRadius: "30px",
                  padding: "20px",
                }}
              >
                🏨
              </div>
            </div>
          </div>
        </div>
      </div>

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
                <div
                  style={{
                    height: "190px",
                    background:
                      "linear-gradient(135deg,#e8e4ff,#d6ecff)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "100px",
                  }}
                >
                  {food.emoji}
                </div>

                <div className="card-body p-4">
                  <h4 className="fw-bold">
                    {food.name}
                  </h4>

                  <p className="text-muted">
                    {food.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <strong
                      style={{
                        color: "#6c5ce7",
                        fontSize: "22px",
                      }}
                    >
                      ${food.price.toFixed(2)}
                    </strong>

                    <button
                      className="btn btn-primary fw-bold"
                      onClick={() => addToCart(food)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
