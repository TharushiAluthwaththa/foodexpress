
import React from "react";
import { Link, useParams } from "react-router-dom";

function FoodMenu() {
  const { id } = useParams();

  const restaurants = {
    1: {
      name: "KFC",
      type: "Fast Food",
      rating: "4.8",
      delivery: "20-30 min",
      emoji: "🍗",
    },
    2: {
      name: "Pizza Hut",
      type: "Pizza & Italian",
      rating: "4.7",
      delivery: "25-35 min",
      emoji: "🍕",
    },
    3: {
      name: "Burger House",
      type: "Burgers",
      rating: "4.9",
      delivery: "15-25 min",
      emoji: "🍔",
    },
  };

  const restaurant =
    restaurants[id] || restaurants[1];

  const foods = [
    {
      id: 1,
      name: "Chicken Burger",
      description:
        "Crispy chicken, fresh lettuce, cheese and special sauce.",
      price: 8.99,
      category: "Burgers",
      emoji: "🍔",
    },
    {
      id: 2,
      name: "Cheese Burger",
      description:
        "Juicy beef patty with melted cheese and fresh vegetables.",
      price: 9.99,
      category: "Burgers",
      emoji: "🍔",
    },
    {
      id: 3,
      name: "Chicken Bucket",
      description:
        "Crispy fried chicken pieces with delicious seasoning.",
      price: 14.99,
      category: "Chicken",
      emoji: "🍗",
    },
    {
      id: 4,
      name: "Chicken Wings",
      description:
        "Spicy and crispy chicken wings served hot.",
      price: 10.99,
      category: "Chicken",
      emoji: "🍗",
    },
    {
      id: 5,
      name: "French Fries",
      description:
        "Golden crispy fries with a little salt.",
      price: 4.99,
      category: "Sides",
      emoji: "🍟",
    },
    {
      id: 6,
      name: "Chicken Pizza",
      description:
        "Hot pizza with chicken, cheese and fresh toppings.",
      price: 12.99,
      category: "Pizza",
      emoji: "🍕",
    },
    {
      id: 7,
      name: "Chocolate Cake",
      description:
        "Soft chocolate cake with delicious chocolate cream.",
      price: 5.99,
      category: "Desserts",
      emoji: "🍰",
    },
    {
      id: 8,
      name: "Soft Drink",
      description:
        "Cold and refreshing soft drink.",
      price: 2.99,
      category: "Drinks",
      emoji: "🥤",
    },
  ];

  const addToCart = (food) => {
    const oldCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingItem = oldCart.find(
      (item) =>
        item.id === food.id &&
        item.restaurantId === Number(id)
    );

    let newCart;

    if (existingItem) {
      newCart = oldCart.map((item) =>
        item.id === food.id &&
        item.restaurantId === Number(id)
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      newCart = [
        ...oldCart,
        {
          ...food,
          quantity: 1,
          restaurantId: Number(id),
          restaurant: restaurant.name,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );

    alert(
      `${food.name} added to cart! 🛒`
    );
  };

  return (
    <div
      style={{
        background: "#fffaf2",
        minHeight: "80vh",
        paddingBottom: "70px",
      }}
    >

      {/* RESTAURANT HEADER */}

      <section
        style={{
          background:
            "linear-gradient(135deg,#ff9f1c,#ff6b35)",
          color: "white",
          padding: "55px 0",
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

              <span className="badge bg-light text-dark px-3 py-2 mb-3">
                {restaurant.type}
              </span>

              <h1 className="display-4 fw-bold">
                {restaurant.name}
              </h1>

              <p className="fs-5">
                Delicious food delivered
                straight to your doorstep.
              </p>

              <div className="fs-5">
                ⭐ {restaurant.rating}
                <span className="mx-2">•</span>
                🛵 {restaurant.delivery}
              </div>

            </div>

            <div className="col-md-4 text-center">

              <div
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "auto",
                  borderRadius: "30px",
                  background:
                    "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "110px",
                }}
              >
                {restaurant.emoji}
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* MENU */}

      <section className="container py-5">

        <div className="d-flex justify-content-between align-items-end mb-4">

          <div>
            <small
              style={{
                color: "#ff9f1c",
                fontWeight: "800",
                letterSpacing: "2px",
              }}
            >
              MENU
            </small>

            <h2 className="fw-bold mb-1">
              Delicious Food
            </h2>

            <p className="text-muted mb-0">
              Choose your favorite food
            </p>
          </div>

          <Link
            to="/cart"
            className="btn btn-dark px-4 py-2 fw-bold"
          >
            🛒 Cart
          </Link>

        </div>


        {/* FOOD CARDS */}

        <div className="row g-4">

          {foods.map((food) => (

            <div
              className="col-md-6 col-lg-4"
              key={food.id}
            >

              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "22px",
                  overflow: "hidden",
                  transition:
                    "transform .2s",
                }}
              >

                {/* FOOD IMAGE */}

                <div
                  style={{
                    height: "200px",
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


                {/* FOOD DETAILS */}

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-start">

                    <div>

                      <span
                        className="badge mb-2"
                        style={{
                          background:
                            "#fff1d6",
                          color: "#e67e00",
                        }}
                      >
                        {food.category}
                      </span>

                      <h4 className="fw-bold">
                        {food.name}
                      </h4>

                    </div>

                  </div>

                  <p className="text-muted">
                    {food.description}
                  </p>


                  {/* PRICE + BUTTON */}

                  <div
                    className="d-flex justify-content-between align-items-center mt-4"
                  >

                    <strong
                      style={{
                        color: "#ff8c00",
                        fontSize: "23px",
                      }}
                    >
                      $
                      {food.price.toFixed(2)}
                    </strong>

                    <button
                      className="btn btn-warning fw-bold px-4"
                      onClick={() =>
                        addToCart(food)
                      }
                    >
                      + Add
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* BOTTOM CART */}

        <div
          className="text-center mt-5 p-4"
          style={{
            background: "white",
            borderRadius: "20px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,.06)",
          }}
        >

          <h4 className="fw-bold">
            🛒 Ready to checkout?
          </h4>

          <p className="text-muted">
            Check your cart and continue
            to checkout.
          </p>

          <Link
            to="/cart"
            className="btn btn-warning px-5 py-3 fw-bold"
          >
            View Cart →
          </Link>

        </div>

      </section>

    </div>
  );
}

export default FoodMenu;
