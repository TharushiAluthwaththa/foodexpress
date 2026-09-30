import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const categories = [
    {
      icon: "🍔",
      name: "Burgers",
      text: "Juicy & delicious",
    },
    {
      icon: "🍕",
      name: "Pizza",
      text: "Hot & cheesy",
    },
    {
      icon: "🍗",
      name: "Chicken",
      text: "Crispy & tasty",
    },
    {
      icon: "🍜",
      name: "Noodles",
      text: "Fresh & spicy",
    },
    {
      icon: "🍰",
      name: "Desserts",
      text: "Sweet moments",
    },
    {
      icon: "🥤",
      name: "Drinks",
      text: "Cool & refreshing",
    },
  ];

  const restaurants = [
    {
      name: "KFC",
      type: "Fast Food",
      rating: "4.8",
      delivery: "20-30 min",
      image:
        "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Pizza Hut",
      type: "Pizza & Italian",
      rating: "4.7",
      delivery: "25-35 min",
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Burger House",
      type: "Burgers",
      rating: "4.9",
      delivery: "15-25 min",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="food-home">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-overlay"></div>

        <div className="container hero-content">

          <div className="row align-items-center">

            <div className="col-lg-7">

              <span className="hero-small">
                🔥 Delicious food is waiting
              </span>

              <h1>
                Your favorite food,
                <br />
                <span>delivered fast.</span>
              </h1>

              <p>
                Discover the best restaurants and hotels
                around you. Order your favorite meals and
                enjoy them at your doorstep.
              </p>

              <div className="hero-buttons">

                <Link
                  to="/restaurants"
                  className="hero-primary-btn"
                >
                  🍔 Order Now
                </Link>

                <Link
                  to="/restaurants"
                  className="hero-secondary-btn"
                >
                  Explore Restaurants →
                </Link>

              </div>

              <div className="hero-stats">

                <div>
                  <strong>500+</strong>
                  <span>Restaurants</span>
                </div>

                <div>
                  <strong>50K+</strong>
                  <span>Happy Customers</span>
                </div>

                <div>
                  <strong>30 min</strong>
                  <span>Average Delivery</span>
                </div>

              </div>

            </div>

            <div className="col-lg-5">

              <div className="hero-food-card">

                <div className="hero-food-image">
                  🍔
                </div>

                <div className="hero-food-info">
                  <div>
                    <h4>Special Burger</h4>
                    <p>Cheese • Chicken • Fresh Veggies</p>
                  </div>

                  <strong>$8.99</strong>
                </div>

                <div className="hero-rating">
                  ⭐ 4.9
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* SEARCH */}

      <section className="search-section">

        <div className="container">

          <div className="search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search for restaurants, food or hotels..."
            />

            <button>
              Search
            </button>

          </div>

        </div>

      </section>


      {/* CATEGORIES */}

      <section className="category-section">

        <div className="container">

          <div className="section-heading">

            <div>
              <span>EXPLORE</span>
              <h2>What are you craving?</h2>
            </div>

            <Link to="/restaurants">
              View All →
            </Link>

          </div>

          <div className="category-grid">

            {categories.map((category) => (

              <div
                className="category-card"
                key={category.name}
              >

                <div className="category-icon">
                  {category.icon}
                </div>

                <h4>{category.name}</h4>

                <p>{category.text}</p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* PROMO */}

      <section className="promo-section">

        <div className="container">

          <div className="promo-card">

            <div>

              <span>
                SPECIAL OFFER
              </span>

              <h2>
                Get 30% OFF
                <br />
                on your first order!
              </h2>

              <p>
                Use code
                <strong> FOOD30 </strong>
                at checkout.
              </p>

              <Link to="/restaurants">
                Order Now →
              </Link>

            </div>

            <div className="promo-emoji">
              🍕
            </div>

          </div>

        </div>

      </section>


      {/* RESTAURANTS */}

      <section className="restaurant-section">

        <div className="container">

          <div className="section-heading">

            <div>
              <span>TOP PICKS</span>
              <h2>Popular Restaurants</h2>
            </div>

            <Link to="/restaurants">
              See All →
            </Link>

          </div>

          <div className="row g-4">

            {restaurants.map((restaurant) => (

              <div
                className="col-md-6 col-lg-4"
                key={restaurant.name}
              >

                <div className="restaurant-card">

                  <div className="restaurant-image">

                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                    />

                    <span className="restaurant-offer">
                      FREE DELIVERY
                    </span>

                  </div>

                  <div className="restaurant-info">

                    <div className="restaurant-title">

                      <div>
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.type}</p>
                      </div>

                      <span className="rating">
                        ⭐ {restaurant.rating}
                      </span>

                    </div>

                    <div className="restaurant-meta">
                      🛵 {restaurant.delivery}
                      <span>•</span>
                      📍 Nearby
                    </div>

                    <Link
                      to="/restaurants"
                      className="view-menu-btn"
                    >
                      View Menu
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* WHY FOOD EXPRESS */}

      <section className="why-section">

        <div className="container">

          <div className="section-heading centered">

            <div>
              <span>WHY FOOD EXPRESS?</span>
              <h2>Food delivery made simple</h2>
            </div>

          </div>

          <div className="row g-4 mt-3">

            <div className="col-md-4">

              <div className="why-card">
                <div>⚡</div>
                <h3>Fast Delivery</h3>
                <p>
                  Get your favorite meals delivered
                  quickly and safely.
                </p>
              </div>

            </div>

            <div className="col-md-4">

              <div className="why-card">
                <div>🍽️</div>
                <h3>Best Restaurants</h3>
                <p>
                  Discover amazing restaurants and
                  hotels near you.
                </p>
              </div>

            </div>

            <div className="col-md-4">

              <div className="why-card">
                <div>💳</div>
                <h3>Easy Checkout</h3>
                <p>
                  Simple ordering and secure checkout
                  every time.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;