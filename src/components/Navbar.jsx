import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const customer = JSON.parse(
    localStorage.getItem("customer_user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer_user");

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="food-navbar">

      <div className="container">

        <div className="navbar-inner">

          {/* LOGO */}

          <Link
            to="/"
            className="food-logo"
          >
            <span>🍔</span>
            Food<span>Express</span>
          </Link>


          {/* NAVIGATION */}

          <div className="food-nav-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/restaurants">
              🍽️ Restaurants
            </Link>

            <Link to="/hotels">
              🏨 Hotels
            </Link>

          </div>


          {/* RIGHT */}

          <div className="navbar-right">

            <Link
              to="/cart"
              className="cart-button"
            >
              🛒
              <span>Cart</span>
            </Link>


            {customer ? (

              <div className="user-dropdown">

                <button className="user-button">

                  <div className="user-avatar">
                    {customer.name
                      ? customer.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>

                  <span>
                    {customer.name}
                  </span>

                  <small>⌄</small>

                </button>

                <div className="dropdown-menu-custom">

                  <div className="dropdown-user-info">

                    <div className="user-avatar large">
                      {customer.name
                        ? customer.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>

                    <div>
                      <strong>
                        {customer.name}
                      </strong>

                      <small>
                        {customer.email}
                      </small>
                    </div>

                  </div>

                  <hr />

                  <Link to="/orders">
                    📦 My Orders
                  </Link>

                  <Link to="/cart">
                    🛒 My Cart
                  </Link>

                  <button onClick={logout}>
                    🚪 Logout
                  </button>

                </div>

              </div>

            ) : (

              <div className="auth-buttons">

                <Link
                  to="/login"
                  className="login-btn"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="register-btn"
                >
                  Sign Up
                </Link>

              </div>

            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;