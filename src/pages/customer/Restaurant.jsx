
import React from "react";
import { Link } from "react-router-dom";

function Restaurant() {
  const restaurants = [
    {
      id: 1,
      name: "KFC",
      type: "Fast Food",
      rating: "4.8",
      delivery: "20-30 min",
      emoji: "🍗",
    },
    {
      id: 2,
      name: "Pizza Hut",
      type: "Pizza & Italian",
      rating: "4.7",
      delivery: "25-35 min",
      emoji: "🍕",
    },
    {
      id: 3,
      name: "Burger House",
      type: "Burgers",
      rating: "4.9",
      delivery: "15-25 min",
      emoji: "🍔",
    },
    {
      id: 4,
      name: "Noodle House",
      type: "Asian",
      rating: "4.6",
      delivery: "20-30 min",
      emoji: "🍜",
    },
    {
      id: 5,
      name: "Chicken Corner",
      type: "Chicken",
      rating: "4.8",
      delivery: "25-35 min",
      emoji: "🍗",
    },
    {
      id: 6,
      name: "Sweet Bakery",
      type: "Desserts",
      rating: "4.7",
      delivery: "15-25 min",
      emoji: "🍰",
    },
  ];

  return (
    <div
      style={{
        background: "#fffaf2",
        minHeight: "80vh",
        padding: "60px 0",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <small
            style={{
              color: "#ff9f1c",
              fontWeight: "800",
              letterSpacing: "2px",
            }}
          >
            FOOD EXPRESS
          </small>

          <h1 className="fw-bold display-5">
            🍽️ Restaurants
          </h1>

          <p className="text-muted fs-5">
            Find your favorite restaurant and order delicious food.
          </p>
        </div>

        <div className="row g-4">
          {restaurants.map((restaurant) => (
            <div
              className="col-md-6 col-lg-4"
              key={restaurant.id}
            >
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "22px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "210px",
                    background:
                      "linear-gradient(135deg,#fff0d0,#ffd27d)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "110px",
                  }}
                >
                  {restaurant.emoji}
                </div>

                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h3 className="fw-bold">
                        {restaurant.name}
                      </h3>

                      <p className="text-muted mb-2">
                        {restaurant.type}
                      </p>
                    </div>

                    <span className="badge bg-warning text-dark">
                      ⭐ {restaurant.rating}
                    </span>
                  </div>

                  <p className="text-muted">
                    🛵 {restaurant.delivery}
                  </p>

                  <Link
                    to={`/restaurants/${restaurant.id}`}
                    className="btn btn-warning w-100 py-2 fw-bold"
                  >
                    View Menu →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Restaurant;